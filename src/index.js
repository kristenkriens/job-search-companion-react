import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRouter,routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './shared/styles/styles.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import generalReducer from './store/reducers/general';
import authReducer from './store/reducers/auth';
import navigationReducer from './store/reducers/navigation';
import modalReducer from './store/reducers/modal';
import userReducer from './store/reducers/user';
import geolocateReducer from './store/reducers/geolocate';
import searchReducer from './store/reducers/search';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const history = createBrowserHistory({ basename: '/job-search-companion-react' });

const rootReducer = combineReducers({
  router: connectRouter(history),
  general: generalReducer,
  auth: authReducer,
  navigation: navigationReducer,
  modal: modalReducer,
  user: userReducer,
  geolocate: geolocateReducer,
  search: searchReducer
})

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
