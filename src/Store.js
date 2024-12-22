import { configureStore } from '@reduxjs/toolkit'
import  UserSlice  from './slice/UserSlice'

export default configureStore({
  reducer: {
    currentUser: UserSlice,
  },
})