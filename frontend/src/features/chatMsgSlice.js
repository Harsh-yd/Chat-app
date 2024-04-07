import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getChatMsg = createAsyncThunk('chatMsg/getChatMsg', async (chatId, thunkAPI) => {
  const response = await fetch(`http://localhost:3000/api/messages/${chatId}`, 
  { credentials: 'include' });

  if (!response.ok) {
    throw new Error('error in fetching the user');
  }
  const msgArray = await response.json();
  console.log('msg array', msgArray);
  return msgArray;
});

export const createChatMsg = createAsyncThunk('chatMsg/createChatMsg', async(obj) => {
  const response = await fetch(`http://localhost:3000/api/messages`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(obj),
    credentials: 'include'
  });


  if (!response.ok) {
    throw new Error('Failed to create new Chat Msg');
  }
  const chatMsgCreated = await response.json();
  console.log('new chat Msg created', chatMsgCreated);
  return chatMsgCreated;
});



const initialState = {
  latestMsg: null,
  msgArray: [],
  isMsgloading: false,
  error: null,
};

const chatMsgSlice = createSlice({
  name: 'chatMsg',
  initialState,
  reducers: {
    AddNewMsg: (state, {payload}) => {
      state.latestMsg = payload;
      state.msgArray.push(payload);
    },
    addNewMsg: (state, {payload}) => {
      state.msgArray.push(payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatMsg.pending, (state) => {
        state.isMsgloading = true;
      })
      .addCase(getChatMsg.fulfilled, (state, { payload }) => {
        state.isMsgloading = false;
        state.msgArray = payload;
      })
      .addCase(getChatMsg.rejected, (state, action) => {
        state.isMsgloading = false;
        state.error = action.error;
        console.error('Msg fetching curr user rejected', action.error);
      })
  },
});

export const {AddNewMsg, addNewMsg} = chatMsgSlice.actions;
export default chatMsgSlice.reducer;