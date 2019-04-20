import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  error: null,
  loading: false,
  location: null
}

const geocodeStart = (state, action) => {
  const updatedState = {
    error: null,
    loading: true
  };

  return updateObject(state, updatedState);
}

const geocodeSuccess = (state, action) => {
  const updatedState = {
    error: null,
    loading: false,
    location: action.location
  };

  return updateObject(state, updatedState);
}

const geocodeFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const geocodeReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GEOCODE_START: return geocodeStart(state, action);
    case actionTypes.GEOCODE_SUCCESS: return geocodeSuccess(state, action);
    case actionTypes.GEOCODE_FAIL: return geocodeFail(state, action);
    default: return state;
  }
}

export default geocodeReducer;
