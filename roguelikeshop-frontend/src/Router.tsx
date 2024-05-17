// import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from "./App.tsx";
import Items from "./Items.tsx";
import ItemPage from "./components/ItemPage.tsx";
import Layout from "./components/Layout.tsx";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <App />
                        </Layout>
                    }
                />
                <Route
                    path="/items"
                    element={
                        <Layout>
                            <Items />
                        </Layout>
                    }
                />
                <Route
                    path="/items/:id"
                    element={
                        <Layout>
                            <ItemPage />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}