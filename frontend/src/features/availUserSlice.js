import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAvailUsers = createAsyncThunk('availUser/getAvailUsers', async (_, thunkAPI) => {
  const userId = thunkAPI.getState().user.loggedUser._id;
  const { userChats } = thunkAPI.getState().userChats;

  const response = await fetch('http://localhost:3000/api/users', {credentials: 'include'});

  if (!response.ok) {
    throw new Error('Error in fetching all Users');
  }
  const allUsers = await response.json();


  const pUsers = allUsers.filter((u) => {
    let isChatCreated = false;

    if (userId === u._id) return false;

    if (userChats) {
      isChatCreated = userChats.some((chat) => {
        return chat.members[0] === u._id || chat.members[1] === u._id;
      });
    }

    return !isChatCreated;
  })

  console.log('pUsers');
  return pUsers;
});





const initialState = {
  isLoadingAvailUser: true,
  availUserList: [],
  error: null,
};

const availuserSlice = createSlice({
  name: 'allAvailUsers',
  initialState,
  reducers: {
    removeUserFromAvailList: (state, action) => {
      const userIdToRemove = action.payload._id;
      console.log('id to remove', userIdToRemove);
      state.availUserList = state.availUserList.filter(user => user._id !== userIdToRemove);
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getAvailUsers.pending, (state) => {
          state.isLoadingAvailUser = true;
        })
        .addCase(getAvailUsers.fulfilled, (state, { payload }) => {
          state.isLoadingAvailUser = false;
          state.availUserList = payload;
        })
        .addCase(getAvailUsers.rejected, (state) => {
          state.isLoadingAvailUser = false;
          console.log('fetching avail user req rejected');
        })
  },
});

export const { removeUserFromAvailList } = availuserSlice.actions;

export default availuserSlice.reducer;