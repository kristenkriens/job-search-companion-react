import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './shared/styles/styles.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { rootReducer, history } from './store/reducers/index';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(
    routerMiddleware(history),
    thunk
  )
));

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
