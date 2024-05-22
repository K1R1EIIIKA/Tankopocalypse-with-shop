import {useAppDispatch} from "../../api/app/hooks.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {register} from "../../api/app/authActions.ts";

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
		<form onSubmit={handleSubmit}>
			<input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
			<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
			<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
			<button type="submit">Register</button>
		</form>
	);
}