import {useAppDispatch} from "../../../api/app/hooks.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {register} from "../../../api/app/authActions.ts";
import './Register.css';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function handleSubmit() {
		dispatch(register(name, email, password));
		navigate('/user');
	}

	return (
		<form onSubmit={handleSubmit} className={'register-form'}>
			<h1 className={'mt-4'}>Регистрация</h1>
			<div className="form-group">
				<label htmlFor="name-input" className={'form-label'}>Имя пользователя</label>
				<input
					type="text"
					id={'name-input'}
					className={'form-control'}
					placeholder="kirillka228"
					value={name}
					onChange={(e) => setName(e.target.value)}/>
			</div>
			<div className="form-group">
				<label htmlFor="email-input" className={'form-label'}>Почта</label>
				<input
					type="email"
					id={'email-input'}
					className={'form-control'}
					placeholder="hello@world.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}/>
			</div>
			<div className="form-group">
				<label htmlFor="password-input" className={'form-label'}>Пароль</label>
				<input
					type="password"
					id={'password-input'}
					className={'form-control'}
					placeholder="*****"
					value={password}
					onChange={(e) => setPassword(e.target.value)}/>
			</div>
			<button className={'btn btn-primary mt-2'} type="submit">Зарегистрироваться</button>
		</form>
	);
}