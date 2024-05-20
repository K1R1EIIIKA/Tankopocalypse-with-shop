import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from 'react';
import {useLoginMutation} from "../../api/auth/authApiSice.ts";
import {setCredentials} from "../../api/auth/authSlice.ts";


export default function Login() {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setError('');
    }, [user, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({user, password}).unwrap();
            dispatch(setCredentials(userData));
            setUser('');
            setPassword('');
            navigate('/');
        } catch (err) {
            if (!err.response) {
                setError('Network error');
            } else if (err.response.status === 401) {
                setError('Invalid credentials');
            } else if (err.response.status === 400) {
                setError('Invalid request');
            } else {
                setError('Unknown error');
            }
            errRef.current.focus();
        }
    }

    const handleUserChange = (e) => {
        setUser(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    User:
                    <input ref={userRef} type="text" value={user} onChange={handleUserChange} required/>
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} required/>
                </label>
                <button type="submit" disabled={isLoading}>Login</button>
                <span ref={errRef} style={{color: 'red'}}>{error}</span>
            </form>
        </div>
    );
}