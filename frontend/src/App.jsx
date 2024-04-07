import { createBrowserRouter, createRoutesFromElements,Navigate, Route, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'

import RootLayout from './pages/RootLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import { getCurrUser } from './features/userSlice';
import { fetchUserChats } from './features/userChatsSlice';
import { fetchRecipient } from './features/recipientSlice';
import { setRecipientLoading } from './features/recipientSlice';
import { getAvailUsers } from './features/availUserSlice';


function App() {
  const dispatch = useDispatch();

  const {loggedUser, isloading, error} = useSelector((store) => store.user);
  const {isChatsLoading} = useSelector((store) => store.userChats);
  const {isRecipientLoading} = useSelector((store) => store.recipient);
  

  useEffect(() => {
    if (!loggedUser) {
        dispatch(getCurrUser())
            .then((resp) => {
                if(resp.error) return;
                return dispatch(fetchUserChats());
            })
            .then((res) => {
                if(res.payload === undefined) return;
                const userChats = res.payload;
                dispatch(setRecipientLoading(true)); // Set loading state to true before the loop

                dispatch(getAvailUsers());
                const fetchRecipientsForChats = async () => {
                    for (const chat of userChats) {
                        try {
                            await dispatch(fetchRecipient(chat));
                        } catch (error) {
                            // Log an informative error message for each failed recipient fetch
                            console.error(`Error fetching recipient for chat ID ${chat.id}:`, error);
                            // You can implement retries or fallback strategies here if needed
                        }
                    }
                    dispatch(setRecipientLoading(false)); // Set loading state to false after the loop
                };
                fetchRecipientsForChats();
            })
            .catch((error) => {
                console.error('Error fetching user chats:', error);
            });
    }
}, [dispatch, loggedUser]);

  if (isloading || isChatsLoading || isRecipientLoading) return <h3>Loading...</h3>;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>

        <Route index element={(loggedUser && !error) ? <Home/>: <Register />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
