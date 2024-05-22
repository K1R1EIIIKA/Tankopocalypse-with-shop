import {useEffect} from "react";
import {useAppDispatch} from "../../api/app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../../api/app/authActions.ts";

export default function Logout() {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(logoutUser());
		navigate('/');
	}, [dispatch, navigate]);

	return null;
}