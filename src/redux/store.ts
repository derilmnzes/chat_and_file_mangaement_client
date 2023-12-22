import { configureStore } from '@reduxjs/toolkit'
import user from './features/user'
import snackBar from './features/snackBar'
import modal from './features/modal'
import file from './features/file'




export const store = configureStore({
  reducer: {
   user:user,
   snackbar:snackBar,
   modal:modal,
   file
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch