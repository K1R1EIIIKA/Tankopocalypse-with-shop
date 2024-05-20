import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./apiSlice.ts";
import authSlice from "./auth/authSlice.ts";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});