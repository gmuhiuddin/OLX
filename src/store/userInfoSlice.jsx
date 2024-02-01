import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'UserInfo',
  initialState: {
    userInfo: undefined
  },
  reducers: {
    updataUser: (state, data) => {
      state.userInfo = data.payload
    }
  }
})

export const { updataUser } = counterSlice.actions;

export default counterSlice;