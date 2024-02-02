import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'UserInfo',
  initialState: {
    userInfo: undefined
  },
  reducers: {
    updateUser: (state, data) => {
      console.log(data.payload);
      state.userInfo = data.payload
    }
  }
});

export const { updateUser } = counterSlice.actions;

export default counterSlice;