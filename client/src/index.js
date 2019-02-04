import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker"
import App from "./app";
import {Provider} from "mobx-react";
import {BrowserRouter} from "react-router-dom"
import AppStore from "stores/app_store/app_store"
// import UserStore from "./stores/user_store";
// const store = new UserStore();

const store = AppStore.create(window.INITIAL_STATE)

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
    ,
    document.getElementById("root")
  );
}, false)

serviceWorker.unregister()