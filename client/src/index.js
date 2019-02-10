import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import App from './app'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
// import HTML5Backend from "react-dnd-html5-backend"
import TouchBackend from 'react-dnd-touch-backend'
import { CookiesProvider } from 'react-cookie'

import { DragDropContextProvider } from 'react-dnd'
import AppStore from 'stores/app_store/app_store'
// import UserStore from "./stores/user_store";
// const store = new UserStore();

const store = AppStore.create(window.INITIAL_STATE)

document.addEventListener(
  'DOMContentLoaded',
  function () {
    ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <CookiesProvider>
            <DragDropContextProvider
              backend={TouchBackend({ enableMouseEvents: true })}
            >
              <App />
            </DragDropContextProvider>
          </CookiesProvider>
        </Provider>
      </BrowserRouter>,
      document.getElementById('root')
    )
  },
  false
)

serviceWorker.unregister()
