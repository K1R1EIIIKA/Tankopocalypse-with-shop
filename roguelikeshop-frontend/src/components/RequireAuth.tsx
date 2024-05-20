import {selectToken} from "../api/auth/authSlice.ts";
import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export default function RequireAuth() {
    const token = useSelector(selectToken)
    const location = useLocation();

    return (
        token ? <Outlet/> : <Navigate to='/login' state={{from: location}} replace/>
    );
}