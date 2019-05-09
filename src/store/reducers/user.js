import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  userIp: null,
  userAgent: null,
  lat: null,
  lng: null,
  error: null
}

const getUserIpStart = (state, action) => {
  const updatedState = {
    userIp: null
  };

  return updateObject(state, updatedState);
}

const getUserIpSuccess = (state, action) => {
  const updatedState = {
    userIp: action.userIp
  };

  return updateObject(state, updatedState);
}

const getUserIpFail = (state, action) => {
  const updatedState = {
    error: action.error
  };

  return updateObject(state, updatedState);
}

const getUserAgent = (state, action) => {
  const updatedState = {
    userAgent: action.userAgent
  };

  return updateObject(state, updatedState);
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_USER_IP_START: return getUserIpStart(state, action);
    case actionTypes.GET_USER_IP_SUCCESS: return getUserIpSuccess(state, action);
    case actionTypes.GET_USER_IP_FAIL: return getUserIpFail(state, action);
    case actionTypes.GET_USER_AGENT: return getUserAgent(state, action);
    default: return state;
  }
}

export default userReducer;
