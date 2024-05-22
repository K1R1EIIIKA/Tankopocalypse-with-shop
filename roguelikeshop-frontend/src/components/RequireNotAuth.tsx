import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../api/app/hooks";

export default function RequireNotAuth() {
	const token = useAppSelector((state) => state.auth.token);

	return (
		token ? <Navigate to="/" replace/> : <Outlet/>
	);
}
