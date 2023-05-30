import React from 'react';
import App from './App';
import ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';
import { createStore, compose, applyMiddleware } from 'redux';
import allreducers from './redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import "./assets/scss/style.scss";

let middlewares = []
middlewares.push(ReduxLogger);

const root = ReactDOM.createRoot(document.getElementById('root'));
const enhancers = compose(
  applyMiddleware(...[ReduxThunk, ...middlewares]),
  window.devToolsExtension
    ? window.devToolsExtension()
    : f => f
), store = createStore(allreducers, enhancers), app = document.getElementById('root');

if (app) {
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
}

reportWebVitals();

