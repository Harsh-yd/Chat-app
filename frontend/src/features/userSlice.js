import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:3000/api/users/user';


export const getCurrUser = createAsyncThunk('user/getCurrUser', async (_, thunkAPI) => {
  const response = await fetch(url, { credentials: 'include' });

  if (!response.ok) {
    throw new Error('error in fetching the user');
  }
  const currUser = await response.json();
  return currUser;
});

export const logOutUser = createAsyncThunk('user/logout', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users/logout', { credentials: 'include' });

    if (!response.ok) {
      throw new Error('Failed to logout');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error.message);
  }
});


const initialState = {
  loggedUser: null,
  isloading: true,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrUser.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getCurrUser.fulfilled, (state, { payload }) => {
        state.isloading = false;
        state.loggedUser = payload.user;
        console.log('curr user fetching completed');
      })
      .addCase(getCurrUser.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error;
        console.error('req for fetching curr user rejected', action.error);
      })
      .addCase(logOutUser.pending, (state) => {
        state.isloading = true;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.isloading = false;
        state.loggedUser = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error;
        console.error('req for logout rejected', action.error);
      })
  },
});

export default userSlice.reducer;