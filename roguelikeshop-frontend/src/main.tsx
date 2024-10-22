// import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import Router from "./Router.tsx";
import {Provider} from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import axios from "axios";
import {store} from "./api/app/store.ts";
import './index.css'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(
	<Provider store={store}>
		<Router/>
	</Provider>
)
