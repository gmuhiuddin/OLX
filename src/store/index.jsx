import { configureStore } from '@reduxjs/toolkit';
import UserCliceSlice from './userInfoSlice'

const store = configureStore({
  reducer: UserCliceSlice.reducer
});

export default store;