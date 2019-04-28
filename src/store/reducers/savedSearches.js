import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  savedSearches: [],
  loading: false,
  error: null
}

const setSavedSearchStart = (state, action) => {
  const updatedState = {
    loading: true
  };

  return updateObject(state, updatedState);
}

const setSavedSearchSuccess = (state, action) => {
  const updatedState = {
    loading: false,
    id: action.id,
    savedSearches: state.savedSearches.concat(action.savedSearch)
  };

  return updateObject(state, updatedState);
}

const setSavedSearchFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const getSavedSearchesStart = (state, action) => {
  const updatedState = {
    loading: true
  };

  return updateObject(state, updatedState);
}

const getSavedSearchesSuccess = (state, action) => {
  const updatedState = {
    savedSearches: action.savedSearches,
    loading: false
  };

  return updateObject(state, updatedState);
}

const getSavedSearchesFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const savedSearchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SAVED_SEARCH_START: return setSavedSearchStart(state, action);
    case actionTypes.SET_SAVED_SEARCH_SUCCESS: return setSavedSearchSuccess(state, action);
    case actionTypes.SET_SAVED_SEARCH_FAIL: return setSavedSearchFail(state, action);
    case actionTypes.GET_SAVED_SEARCHES_START: return getSavedSearchesStart(state, action);
    case actionTypes.GET_SAVED_SEARCHES_SUCCESS: return getSavedSearchesSuccess(state, action);
    case actionTypes.GET_SAVED_SEARCHES_FAIL: return getSavedSearchesFail(state, action);
    default: return state;
  }
}

export default savedSearchesReducer;
