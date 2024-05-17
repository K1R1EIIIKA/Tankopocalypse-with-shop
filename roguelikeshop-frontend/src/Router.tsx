// import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from "./App.tsx";
import Items from "./Items.tsx";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/items" element={<Items />} />
            </Routes>
        </BrowserRouter>
    );
}