import { configureStore } from "@reduxjs/toolkit";
import { cryptoApiSlice } from "./features/cryptoAPI";
import { newsApiSlice } from "./features/cryptoNews";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [cryptoApiSlice.reducerPath]: cryptoApiSlice.reducer,
    [newsApiSlice.reducerPath]: newsApiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
