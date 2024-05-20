import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {logout, setCredentials} from "./auth/authSlice.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 403) {
        console.log('Reauthenticating...');

        const refreshResult = await baseQuery('/auth/reauth', api, extraOptions);
        console.log('Refresh result:', refreshResult);
        if (refreshResult.data) {
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({...refreshResult.data, user}));

            result = await baseQuery(args, api, extraOptions);
        }
        else {
            api.dispatch(logout());
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryReauth,
    endpoints: () => ({})
});