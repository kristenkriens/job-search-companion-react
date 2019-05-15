import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  savedApplications: [],
  loading: false,
  error: null
}

const setSavedApplicationStart = (state, action) => {
  const updatedState = {
    loading: true
  };

  return updateObject(state, updatedState);
}

const setSavedApplicationSuccess = (state, action) => {
  const newSavedApplication = [];
  newSavedApplication.push(updateObject(action.savedApplication, { applicationId: action.applicationId }));

  const updatedState = {
    loading: false,
    savedApplications: newSavedApplication.concat(state.savedApplications)
  };

  return updateObject(state, updatedState);
}

const setSavedApplicationFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const getSavedApplicationsStart = (state, action) => {
  const updatedState = {
    loading: true
  };

  return updateObject(state, updatedState);
}

const getSavedApplicationsSuccess = (state, action) => {
  const updatedState = {
    savedApplications: action.savedApplications,
    loading: false
  };

  return updateObject(state, updatedState);
}

const getSavedApplicationsFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const changeSavedApplicationsStart = (state, action) => {
  const updatedState = {
    loading: true
  };

  return updateObject(state, updatedState);
}

const changeSavedApplicationsSuccess = (state, action) => {
  const updatedState = {
    loading: false,
    savedApplications: action.savedApplications
  };

  return updateObject(state, updatedState);
}

const changeSavedApplicationsFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const removeSavedApplicationStart = (state, action) => {
  const updatedState = {
    loading: true
  };

  return updateObject(state, updatedState);
}

const removeSavedApplicationSuccess = (state, action) => {
  const updatedState = {
    loading: false
  };

  return updateObject(state, updatedState);
}

const removeSavedApplicationFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const removeSavedApplicationsStart = (state, action) => {
  const updatedState = {
    loading: true
  };

  return updateObject(state, updatedState);
}

const removeSavedApplicationsSuccess = (state, action) => {
  const updatedState = {
    loading: false
  };

  return updateObject(state, updatedState);
}

const removeSavedApplicationsFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const savedApplicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SAVED_APPLICATION_START: return setSavedApplicationStart(state, action);
    case actionTypes.SET_SAVED_APPLICATION_SUCCESS: return setSavedApplicationSuccess(state, action);
    case actionTypes.SET_SAVED_APPLICATION_FAIL: return setSavedApplicationFail(state, action);
    case actionTypes.GET_SAVED_APPLICATIONS_START: return getSavedApplicationsStart(state, action);
    case actionTypes.GET_SAVED_APPLICATIONS_SUCCESS: return getSavedApplicationsSuccess(state, action);
    case actionTypes.GET_SAVED_APPLICATIONS_FAIL: return getSavedApplicationsFail(state, action);
    case actionTypes.CHANGE_SAVED_APPLICATIONS_START: return changeSavedApplicationsStart(state, action);
    case actionTypes.CHANGE_SAVED_APPLICATIONS_SUCCESS: return changeSavedApplicationsSuccess(state, action);
    case actionTypes.CHANGE_SAVED_APPLICATIONS_FAIL: return changeSavedApplicationsFail(state, action);
    case actionTypes.REMOVE_SAVED_APPLICATION_START: return removeSavedApplicationStart(state, action);
    case actionTypes.REMOVE_SAVED_APPLICATION_SUCCESS: return removeSavedApplicationSuccess(state, action);
    case actionTypes.REMOVE_SAVED_APPLICATION_FAIL: return removeSavedApplicationFail(state, action);
    case actionTypes.REMOVE_SAVED_APPLICATIONS_START: return removeSavedApplicationsStart(state, action);
    case actionTypes.REMOVE_SAVED_APPLICATIONS_SUCCESS: return removeSavedApplicationsSuccess(state, action);
    case actionTypes.REMOVE_SAVED_APPLICATIONS_FAIL: return removeSavedApplicationsFail(state, action);
    default: return state;
  }
}

export default savedApplicationsReducer;
