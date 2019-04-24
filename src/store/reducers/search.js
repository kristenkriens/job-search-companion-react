import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  location: '',
  country: 'ca',
  query: '',
  age: '',
  radius: '',
  jobType: 'nopreference',
  error: null,
  loading: false,
  results: null,
  totalResults: 0
}

const searchFormUpdateElement = (state, action) => {
  const updatedState = {
    [action.formElementName]: action.value
  };

  return updateObject(state, updatedState);
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
    results: action.results,
    totalResults: action.totalResults
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

const searchClear = (state, action) => {
  const updatedState = initialState;

  return updateObject(state, updatedState);
}

const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SEARCH_FORM_UPDATE_ELEMENT: return searchFormUpdateElement(state, action);
    case actionTypes.SEARCH_START: return searchStart(state, action);
    case actionTypes.SEARCH_SUCCESS: return searchSuccess(state, action);
    case actionTypes.SEARCH_FAIL: return searchFail(state, action);
    case actionTypes.SEARCH_CLEAR: return searchClear(state, action);
    default: return state;
  }
}

export default searchReducer;
