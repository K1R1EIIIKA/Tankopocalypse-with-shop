import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../api/reducers/authReducer.ts';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']