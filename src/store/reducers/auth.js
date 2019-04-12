import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const authStart = (state, action) => {
  const updatedState = {
    error: null,
    loading: true
  };

  return updateObject(state, updatedState);
}

const authSuccess = (state, action) => {
  const updatedState2 = {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  };

  return updateObject(state, updatedState2);
}

const authFail = (state, action) => {
  const updatedState3 = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState3);
}

const authLogout = (state, action) => {
  const updatedState4 = {
    token: null,
    userId: null
  };

  return updateObject(state, updatedState4);
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
}

export default authReducer;
