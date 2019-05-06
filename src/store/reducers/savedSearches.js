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
  const newSavedSearch = [];
  newSavedSearch.push(updateObject(action.savedSearch, { searchId: action.searchId }));

  const updatedState = {
    loading: false,
    savedSearches: newSavedSearch.concat(state.savedSearches)
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

const useSavedSearchStart = (state, action) => {
  const updatedState = {
    loading: true
  };

  return updateObject(state, updatedState);
}

const useSavedSearchSuccess = (state, action) => {
  const updatedState = {
    loading: false
  };

  return updateObject(state, updatedState);
}

const useSavedSearchFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const removeSavedSearchStart = (state, action) => {
  const updatedState = {
    loading: true
  };

  return updateObject(state, updatedState);
}

const removeSavedSearchSuccess = (state, action) => {
  const updatedState = {
    loading: false
  };

  return updateObject(state, updatedState);
}

const removeSavedSearchFail = (state, action) => {
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
    case actionTypes.USE_SAVED_SEARCH_START: return useSavedSearchStart(state, action);
    case actionTypes.USE_SAVED_SEARCH_SUCCESS: return useSavedSearchSuccess(state, action);
    case actionTypes.USE_SAVED_SEARCH_FAIL: return useSavedSearchFail(state, action);
    case actionTypes.REMOVE_SAVED_SEARCH_START: return removeSavedSearchStart(state, action);
    case actionTypes.REMOVE_SAVED_SEARCH_SUCCESS: return removeSavedSearchSuccess(state, action);
    case actionTypes.REMOVE_SAVED_SEARCH_FAIL: return removeSavedSearchFail(state, action);
    default: return state;
  }
}

export default savedSearchesReducer;
