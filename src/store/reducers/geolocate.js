import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  error: null,
  loading: false,
  location: null
}

const geolocateStart = (state, action) => {
  const updatedState = {
    error: null,
    loading: true
  };

  return updateObject(state, updatedState);
}

const geolocateSuccess = (state, action) => {
  const updatedState = {
    error: null,
    loading: false,
    location: action.location
  };

  return updateObject(state, updatedState);
}

const geolocateFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const geolocateReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GEOLOCATE_START: return geolocateStart(state, action);
    case actionTypes.GEOLOCATE_SUCCESS: return geolocateSuccess(state, action);
    case actionTypes.GEOLOCATE_FAIL: return geolocateFail(state, action);
    default: return state;
  }
}

export default geolocateReducer;
