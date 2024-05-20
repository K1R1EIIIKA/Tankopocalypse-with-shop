// import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import Router from "./Router.tsx";
import {Provider} from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import store from "./api/store.ts";
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(
    <Provider store={store}>
        <Router/>
    </Provider>
)
