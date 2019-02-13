import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import App from './app'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import TouchBackend from 'react-dnd-touch-backend'
import { DragDropContextProvider } from 'react-dnd'
import AppStore from 'stores/app_store/app_store'

const store = AppStore.create(window.INITIAL_STATE)

document.addEventListener(
  'DOMContentLoaded',
  function () {
    ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <DragDropContextProvider
            backend={TouchBackend({ enableMouseEvents: true })}
          >
            <App />
          </DragDropContextProvider>
        </Provider>
      </BrowserRouter>,
      document.getElementById('root')
    )
  },
  false
)

serviceWorker.unregister()
