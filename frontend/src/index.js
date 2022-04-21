import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// eslint-disable-next-line
import { Provider } from 'react-redux';
// eslint-disable-next-line
import store from "./store"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


