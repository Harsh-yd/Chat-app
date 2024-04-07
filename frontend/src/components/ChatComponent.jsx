import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { useDispatch, useSelector } from 'react-redux'; // Removed useSelector as it's not used
import { getChatMsg } from '../features/chatMsgSlice';
import { setOpenChat } from '../features/userChatsSlice';
import Chat from './Chat';

const ChatComponent = () => {
  const dispatch = useDispatch();
  const {recipients} = useSelector((store) => store.recipient);


  const fetchChatMsg = (chat) => { 
    dispatch(setOpenChat(chat));
    dispatch(getChatMsg(chat.chatId));
  }

  return (
    <div>
      <Stack spacing={1}>
        {recipients.map(chat => (
          <div key={chat._id} onClick={() => fetchChatMsg(chat)}>
            <Chat  chat={chat}/>
            <Divider />
          </div>
        ))}
      </Stack>
    </div>
  );
}

export default ChatComponent;
