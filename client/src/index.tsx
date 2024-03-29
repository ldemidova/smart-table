import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
