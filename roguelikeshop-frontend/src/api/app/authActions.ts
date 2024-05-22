import axios from 'axios';
import {loginSuccess, logout, setLoading, userLoaded} from './authReducer.ts';

export const register = (name, email, password) => async dispatch => {
	try {
		await axios.post('http://localhost:8000/api/auth/register', {name, email, password});
		dispatch(login(email, password));
	} catch (error) {
		console.error(error);
	}
}

export const login = (email, password) => async dispatch => {
	try {
		const response = await axios.post('http://localhost:8000/api/auth/login', {email, password});
		const {jwt, refresh_jwt} = response.data;

		document.cookie = `jwt=${jwt}; path=/`;
		document.cookie = `refresh_jwt=${refresh_jwt}; path=/`;
		localStorage.setItem('jwt', jwt);
		localStorage.setItem('refresh_jwt', refresh_jwt);

		dispatch(loginSuccess({token: jwt, refreshToken: refresh_jwt}));

		dispatch(loadUser());
	} catch (error) {
		console.error(error);
	}
};

export const refreshToken = () => async dispatch => {
	try {
		const refreshToken = document.cookie.split(';').map(cookie => cookie.trim()).find(cookie => cookie.startsWith('refresh_jwt='))?.split('=')[1];
		console.log('refreshToken', refreshToken)
		const response = await axios.post('http://localhost:8000/api/auth/refresh', {refresh_jwt: refreshToken});
		const {jwt} = response.data;
		//
		// console.log('refreshToken', jwt, refresh_jwt);
		// Сохранение токенов в куки
		document.cookie = `jwt=${jwt}; path=/`;
		// document.cookie = `refresh_jwt=${refresh_jwt}; path=/`;
		localStorage.setItem('jwt', jwt);
		// localStorage.setItem('refresh_jwt', refresh_jwt);
		dispatch(loginSuccess({token: jwt, refreshToken: refreshToken}));

		dispatch(loadUser());
	} catch (error) {
		dispatch(logout());
		console.error(error);
	}
}

export const loadUser = () => async (dispatch) => {
	dispatch(setLoading(true)); // Установить состояние загрузки в true перед загрузкой пользователя
	try {
		const token = document.cookie.split(';').map(cookie => cookie.trim()).find(cookie => cookie.startsWith('jwt='))?.split('=')[1];

		if (token) {
			const response = await axios.get('http://localhost:8000/api/auth/user', {withCredentials: true});
			dispatch(userLoaded(response.data));
		} else {
			dispatch(logout());
		}
	} catch (error) {
		if (error.response && error.response.status === 403) {
			dispatch(refreshToken());
		} else {
			dispatch(logout());
		}
	} finally {
		dispatch(setLoading(false)); // Установить состояние загрузки в false после загрузки пользователя
	}
};

export const logoutUser = () => async dispatch => {
	await axios.post('http://localhost:8000/api/auth/logout', {}, {withCredentials: true});
	dispatch(logout());
};
