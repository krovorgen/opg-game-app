import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import { ToastContainer } from 'react-toastify';

import { store } from './redux/store';
import { App } from './App';

import './scss/index.scss';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <ToastContainer
      position="bottom-left"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </Provider>,
);

serviceWorker.unregister();
