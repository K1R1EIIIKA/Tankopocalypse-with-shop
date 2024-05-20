import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            state.loading = false;
        },
        userLoaded: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { loginSuccess, userLoaded, logout } = authSlice.actions;
export default authSlice.reducer;
