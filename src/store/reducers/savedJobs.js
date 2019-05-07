import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  savedJobs: [],
  loading: false,
  error: null
}

const setSavedJobStart = (state, action) => {
  const updatedState = {
    loading: true
  };

  return updateObject(state, updatedState);
}

const setSavedJobSuccess = (state, action) => {
  const newSavedJob = [];
  newSavedJob.push(updateObject(action.savedJob, { searchId: action.searchId }));

  const updatedState = {
    loading: false,
    savedJobs: newSavedJob.concat(state.savedJobs)
  };

  return updateObject(state, updatedState);
}

const setSavedJobFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const getSavedJobsStart = (state, action) => {
  const updatedState = {
    loading: true
  };

  return updateObject(state, updatedState);
}

const getSavedJobsSuccess = (state, action) => {
  const updatedState = {
    savedJobs: action.savedJobs,
    loading: false
  };

  return updateObject(state, updatedState);
}

const getSavedJobsFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const removeSavedJobStart = (state, action) => {
  const updatedState = {
    loading: true
  };

  return updateObject(state, updatedState);
}

const removeSavedJobSuccess = (state, action) => {
  const updatedState = {
    loading: false
  };

  return updateObject(state, updatedState);
}

const removeSavedJobFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const savedJobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SAVED_JOB_START: return setSavedJobStart(state, action);
    case actionTypes.SET_SAVED_JOB_SUCCESS: return setSavedJobSuccess(state, action);
    case actionTypes.SET_SAVED_JOB_FAIL: return setSavedJobFail(state, action);
    case actionTypes.GET_SAVED_JOBS_START: return getSavedJobsStart(state, action);
    case actionTypes.GET_SAVED_JOBS_SUCCESS: return getSavedJobsSuccess(state, action);
    case actionTypes.GET_SAVED_JOBS_FAIL: return getSavedJobsFail(state, action);
    case actionTypes.REMOVE_SAVED_JOB_START: return removeSavedJobStart(state, action);
    case actionTypes.REMOVE_SAVED_JOB_SUCCESS: return removeSavedJobSuccess(state, action);
    case actionTypes.REMOVE_SAVED_JOB_FAIL: return removeSavedJobFail(state, action);
    default: return state;
  }
}

export default savedJobsReducer;
