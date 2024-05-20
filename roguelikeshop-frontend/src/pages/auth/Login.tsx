import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../api/store/userSlice.ts";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        let currentCredentials = {
            email, password
        }
        dispatch(loginUser(currentCredentials)).then((response) => {
            if (response.payload) {
                setEmail('');
                console.log(111)
                setPassword('');
                navigate('/');
            }
        });
    }

    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" className={'form-control'} value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" className={'form-control'} value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className={'btn btn-success'}>Login</button>
        </form>
    );
}