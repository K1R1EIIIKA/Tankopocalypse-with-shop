import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../api/app/hooks";
import { loadUser } from "../api/app/authActions.ts";

export default function RequireAuth() {
    const dispatch = useAppDispatch();
    const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            dispatch(loadUser());
        }
    }, [dispatch, isAuthenticated, loading]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" state={{ from: location }} replace />
    );
}
