import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import authReducer from './auth';
import navigationReducer from './navigation';
import modalReducer from './modal';
import userReducer from './user';
import geolocateReducer from './geolocate';
import searchReducer from './search';
import savedSearchesReducer from './savedSearches';

export const history = createBrowserHistory({ basename: '/job-search-companion-react' });

export const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  navigation: navigationReducer,
  modal: modalReducer,
  user: userReducer,
  geolocate: geolocateReducer,
  search: searchReducer,
  savedSearches: savedSearchesReducer
});
