import {Link} from "react-router-dom";
// import {useSelector} from "react-redux";
// import {RootState} from "@reduxjs/toolkit/query";
import {useAppSelector} from "../api/app/hooks.ts";
// import {getUserInfo} from "../api/account/userInfoApi.ts";
import {refreshUserInfo, useUserInfo} from "./useUserInfo.tsx";
import {useEffect} from "react";

export default function Header() {
	// const user = useSelector((state: RootState) => state.auth.user);
	const user: any = useAppSelector((state) => state.auth.user);
	const userInfo = useUserInfo();


	return (
		<header>
			<nav className={'nav'}>
				<Link to="/" className="nav-link">Home</Link>
				<Link to="/items" className="nav-link">Items</Link>
				{!user && (
					<>
						<Link to="/auth/login" className="nav-link">Login</Link>
						<Link to="/auth/register" className="nav-link">Register</Link>
					</>
				)}
				{user && (
					<>
						<Link to="/user" className="nav-link">{user.name} ({userInfo?.balance} руб.)</Link>
						<Link to="/cart" className="nav-link">Cart</Link>
						<Link to="/auth/logout" className="nav-link">Logout</Link>
					</>
				)}

			</nav>
		</header>
	);
}