import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker"
import App from "./app";
import {Provider} from "mobx-react";
import {BrowserRouter} from "react-router-dom"

import UserStore from "./stores/user_store";

const userStore = new UserStore();



document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={userStore}>
        <App/>
      </Provider>
    </BrowserRouter>
    ,
    document.getElementById("root")
  );
}, false)

serviceWorker.unregister()