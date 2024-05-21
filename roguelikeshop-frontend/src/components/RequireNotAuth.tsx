import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function RequireNotAuth() {
    const token = useAppSelector((state) => state.auth.token);
    const location = useLocation();

    console.log(location)
    // return to previous location if user is already authenticated
    return (
        token ? <Navigate to="/" replace /> : <Outlet />
    );
}
