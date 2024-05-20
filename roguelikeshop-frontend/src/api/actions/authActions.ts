import axios from 'axios';
import { loginSuccess, userLoaded, logout } from '../reducers/authReducer';

export const login = (email, password) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
        const { jwt, refresh_jwt } = response.data;

        // Сохранение токенов в куки
        document.cookie = `jwt=${jwt}; path=/`;
        document.cookie = `refresh_jwt=${refresh_jwt}; path=/`;

        dispatch(loginSuccess({ token: jwt, refreshToken: refresh_jwt }));

        dispatch(loadUser());
    } catch (error) {
        console.error(error);
    }
};

export const loadUser = () => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        console.log(token);
        if (token) {
            const response = await axios.get('http://localhost:8000/api/auth/user', { withCredentials: true });
            console.log(response.data);
            dispatch(userLoaded(response.data));
        }
    } catch (error) {
        console.error(error);
    }
};

export const logoutUser = () => async dispatch => {
    await axios.post('http://localhost:8000/api/auth/logout');
    dispatch(logout());
};
