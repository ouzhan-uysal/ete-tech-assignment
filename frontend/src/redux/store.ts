import { configureStore } from '@reduxjs/toolkit'
import products from './features/products';
import companies from './features/companies';

export const store = configureStore({
  reducer: {
    products: products,
    companies: companies
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
