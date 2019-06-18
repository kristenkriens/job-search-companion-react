import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  token: null,
  userId: null,
  oobCode: null,
  error: null,
  loading: false
}

const clearAuthError = (state, action) => {
  const updatedState = {
    error: null
  };

  return updateObject(state, updatedState);
}

const authStart = (state, action) => {
  const updatedState = {
    error: null,
    loading: true
  };

  return updateObject(state, updatedState);
}

const authSuccess = (state, action) => {
  const updatedState = {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  };

  return updateObject(state, updatedState);
}

const authFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const authLogout = (state, action) => {
  const updatedState = {
    token: null,
    userId: null
  };

  return updateObject(state, updatedState);
}

const authDoneLoading = (state, action) => {
  const updatedState = {
    loading: false
  };

  return updateObject(state, updatedState);
}

const authSetPasswordResetCode = (state, action) => {
  const updatedState = {
    oobCode: action.oobCode
  };

  return updateObject(state, updatedState);
}

const authClearPasswordResetCode = (state, action) => {
  const updatedState = {
    oobCode: null
  };

  return updateObject(state, updatedState);
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.CLEAR_AUTH_ERROR: return clearAuthError(state, action);
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.AUTH_DONE_LOADING: return authDoneLoading(state, action);
    case actionTypes.AUTH_SET_PASSWORD_RESET_CODE: return authSetPasswordResetCode(state, action);
    case actionTypes.AUTH_CLEAR_PASSWORD_RESET_CODE: return authClearPasswordResetCode(state, action);
    default: return state;
  }
}

export default authReducer;
