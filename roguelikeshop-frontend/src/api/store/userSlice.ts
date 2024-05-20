import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'user/login',
    async (userCredentials) => {
        const request = await axios.post('http://localhost:8000/api/auth/login', userCredentials);
        console.log(request.data)
        const response = await request.data.data;
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response));
        return response;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            console.log(action.error.message)
            state.error = action.error.message;
        });
    }
});

export default userSlice.reducer;