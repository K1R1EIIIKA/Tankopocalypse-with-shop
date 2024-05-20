import {selectToken, selectUser} from "../api/auth/authSlice.ts";
import {useSelector} from "react-redux";

export default function Welcome(){
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);

    const welcome = user ? `Welcome, ${user}` : 'Welcome';
    const tokenAbbr = `Token: ${token.slice(0, 10)}...`;

    return (
        <div>
            <h1>{welcome}</h1>
            <p>{tokenAbbr}</p>
        </div>
    );
}