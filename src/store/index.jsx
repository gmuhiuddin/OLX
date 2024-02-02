import { configureStore } from '@reduxjs/toolkit';
import UserInfoSlice from './userInfoSlice'

const store = configureStore({
  reducer: UserInfoSlice.reducer
});

export default store;