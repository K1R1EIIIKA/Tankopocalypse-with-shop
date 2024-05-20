// import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from "./pages/App.tsx";
import Items from "./Items.tsx";
import ItemPage from "./pages/ItemPage.tsx";
import {Layout} from "./components/Layout.tsx";
import Login from "./pages/auth/Login.tsx";
import User from "./pages/User.tsx";
import {useEffect} from "react";
import {loadUser} from "./api/actions/authActions.ts";
import {useAppDispatch} from "./app/hooks.ts";

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
                <Route path="/user" element={<Layout><User/></Layout>}/>
                <Route path="/auth/login" element={<Layout><Login/></Layout>}/>
            </Routes>
        </BrowserRouter>
    );
}