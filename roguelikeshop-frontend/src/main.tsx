import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from "./Router.tsx";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Provider} from "react-redux";
import {store} from "./api/store.ts";

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router/>
        </Provider>
    </React.StrictMode>,
)
