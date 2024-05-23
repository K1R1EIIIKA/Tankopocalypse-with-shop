import {useState} from 'react';
import {login} from "../../../api/app/authActions.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../api/app/hooks.ts";
import './Login.css';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		dispatch(login(email, password));
		navigate('/user');
	};

	return (
		<form onSubmit={handleSubmit} className={'login-form'}>
			<h1 className={'mt-4'}>Вход</h1>
			<div className="form-group">
				<label htmlFor="email-input">Почта</label>
				<input
					id={'email-input'}
					type="email"
					className={'form-control'}
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="password-input">Пароль</label>
				<input
					id={'password-input'}
					type="password"
					className={'form-control'}
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button className={'btn btn-primary mt-2'} type="submit">Войти</button>
		</form>
);
}