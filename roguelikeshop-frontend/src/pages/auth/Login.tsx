import {useState} from 'react';
import {login} from "../../api/app/authActions.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../api/app/hooks.ts";

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
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit">Login</button>
		</form>
	);
}