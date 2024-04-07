import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import userChatsReducer from './features/userChatsSlice';
import recipientReducer from './features/recipientSlice';
import availUserReducer from './features/availUserSlice';
import chatMsgReducer from './features/chatMsgSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    userChats: userChatsReducer,
    recipient: recipientReducer,
    availUser: availUserReducer,
    chatMessages: chatMsgReducer,
  },
});