import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  error: null,
  loading: false,
  results: null
}

const searchStart = (state, action) => {
  const updatedState = {
    error: null,
    loading: true
  };

  return updateObject(state, updatedState);
}

const searchSuccess = (state, action) => {
  const updatedState = {
    error: null,
    loading: false,
    results: action.results
  };

  return updateObject(state, updatedState);
}

const searchFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SEARCH_START: return searchStart(state, action);
    case actionTypes.SEARCH_SUCCESS: return searchSuccess(state, action);
    case actionTypes.SEARCH_FAIL: return searchFail(state, action);
    default: return state;
  }
}

export default searchReducer;
