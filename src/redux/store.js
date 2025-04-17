import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './slices/admin.slice'
import appReducer from './slices/app.slice'
import userReducer from './slices/user.slice'
export const store = configureStore({
  reducer: {
    app: appReducer,
    admin: adminReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
