import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserChats = createAsyncThunk('userChats/fetchUserChats', async (_, thunkAPI) => {
  const userId = thunkAPI.getState().user.loggedUser._id;

  const response = await fetch(`http://localhost:3000/api/chats/${userId}`, { credentials: 'include' });

  if (!response.ok) {
    throw new Error('Failed to fetch user chats');
  }
  const userChats = await response.json();
  return userChats;
});

export const createNewChat = createAsyncThunk('createNewChat', async (u, thunkAPI) => {
  const firstId = thunkAPI.getState().user.loggedUser._id;
  const secondId = u._id;

  if (!firstId) return;

  const response = await fetch(`http://localhost:3000/api/chats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ firstId, secondId }),
    credentials: 'include'
  });


  if (!response.ok) {
    throw new Error('Failed to create new Chat');
  }
  const chatCreated = await response.json();
  console.log('new chat created', chatCreated);
  return chatCreated;
});


const initialState = {
  isChatsLoading: false,
  openChat: null,
  userChats: [],
  error: null
};

const userChatSlice = createSlice({
  name: 'userChats',
  initialState,
  reducers: {
      setOpenChat: (state, {payload}) => {
        state.openChat = payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserChats.pending, (state) => {
        state.isChatsLoading = true;
      })
      .addCase(fetchUserChats.fulfilled, (state, { payload }) => {
        state.isChatsLoading = false;
        state.userChats = payload;
      })
      .addCase(fetchUserChats.rejected, (state, action) => {
        state.isChatsLoading = false;
        state.error = action.error;
        console.error('req for fetching curr user rejected', action.error);
      })
      .addCase(createNewChat.fulfilled, (state, { payload }) => {
        state.isChatsLoading = false;
        state.userChats.push(payload);
      })
  }
});

export const {setOpenChat } = userChatSlice.actions;
export default userChatSlice.reducer;