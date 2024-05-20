import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from "./Router.tsx";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Provider} from "react-redux";
import store from "./api/store/store.ts";

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(
  <Provider store={store}>
    <Router />
  </Provider>,
)
