import {useState} from 'react';
import {login} from "../../api/actions/authActions.ts";
import {redirect} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks.ts";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        //redirect to user page
        redirect('/user')
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