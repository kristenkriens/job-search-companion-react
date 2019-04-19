import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

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
  const updatedState2 = {
    error: null,
    loading: false
  };

  return updateObject(state, updatedState2);
}

const searchFail = (state, action) => {
  const updatedState3 = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState3);
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
