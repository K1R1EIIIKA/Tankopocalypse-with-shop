// import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from "./pages/Index/App.tsx";
import Items from "./pages/Items/Items.tsx";
import ItemPage from "./pages/ItemPage/ItemPage.tsx";
import {Layout} from "./components/Layouts/Layout/Layout.tsx";
import UserPage from "./pages/UserPage/UserPage.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "./api/app/hooks.ts";
import CartPage from "./pages/CartPage/CartPage.tsx";
import {loadUser} from "./api/app/authActions.ts";
import RequireNotAuth from "./components/Layouts/RequireNotAuth.tsx";
import Login from "./pages/auth/Login/Login.tsx";
import RequireAuth from "./components/Layouts/RequireAuth.tsx";
import Logout from "./pages/auth/Logout.tsx";
import Register from "./pages/auth/Register/Register.tsx";
import SkinPage from "./pages/SkinPage/SkinPage.tsx";
import A from "./pages/a.tsx";
import Skins from "./pages/Skins/Skins.tsx";

export default function Router() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout><App/></Layout>}/>
				<Route path="/items" element={<Layout><Items/></Layout>}/>
				<Route path="/items/:id" element={<Layout><ItemPage/></Layout>}/>
				<Route path="/skins" element={<Layout><Skins/></Layout>}/>
				<Route path="/skins/:id" element={<Layout><SkinPage/></Layout>}/>
				<Route element={<Layout><RequireNotAuth/></Layout>}>
					<Route path="/auth/login" element={<Login/>}/>
					<Route path="/auth/register" element={<Register/>}/>
				</Route>
				<Route element={<Layout><RequireAuth/></Layout>}>
					<Route path="/user" element={<UserPage/>}/>
					<Route path="/cart" element={<CartPage/>}/>
					<Route path="/auth/logout" element={<Logout/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}