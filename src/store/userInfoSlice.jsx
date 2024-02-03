import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'UserInfo',
  initialState: {
    userInfo: undefined
  },
  reducers: {
    updateUser: (state, data) => {
      state.userInfo = data.payload
    }
  }
});

export const { updateUser } = counterSlice.actions;

export default counterSlice;