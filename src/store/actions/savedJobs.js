import axios from 'axios';

import firebaseAxios from '../../shared/firebaseAxios';
import * as actionTypes from './actionTypes';
import { openAndSetActiveModalAndMessage } from './modal'
import { getApiKey } from '../../shared/utilities';

export const setSavedJobStart = () => {
  return {
    type: actionTypes.SET_SAVED_JOB_START
  }
}

export const setSavedJobSuccess = (jobId, savedJob) => {
  return {
    type: actionTypes.SET_SAVED_JOB_SUCCESS,
    jobId: jobId,
    savedJob: savedJob
  }
}

export const setSavedJobFail = (error) => {
  return {
    type: actionTypes.SET_SAVED_JOB_FAIL,
    error: error
  }
}

export const setSavedJob = (token, userId, savedJob) => {
  return (dispatch) => {
    dispatch(setSavedJobStart());

    firebaseAxios.post(`/${userId}/saved-jobs.json?auth=${token}`, savedJob)
      .then((response) => {
        dispatch(setSavedJobSuccess(response.data.name, savedJob));
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(setSavedJobFail(errorMessage));
        dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
      });
  }
}

export const getSavedJobsStart = () => {
  return {
    type: actionTypes.GET_SAVED_JOBS_START
  }
}

export const getSavedJobsFind = (savedJobs) => {
  return (dispatch) => {
    let savedJobsKeys = '';
    for(let key in savedJobs) {
      savedJobsKeys += savedJobs[key].jobkey + ',';
    }
    savedJobsKeys = savedJobsKeys.substring(0, savedJobsKeys.length - 1);

    const apiKey = getApiKey('indeed');

    const url = `https://cors-anywhere.herokuapp.com/http://api.indeed.com/ads/apigetjobs?publisher=${apiKey}&jobkeys=${savedJobsKeys}&v=2&format=json`;

    axios.get(url)
      .then((response) => {
        for(let key in savedJobs) {
          if(response.data.results[key] !== undefined) {
            response.data.results[key].jobId = savedJobs[key].jobId;
          }
        }

        if(response.data.error) {
          const errorMessage = response.data.error;

          dispatch(getSavedJobsFail(errorMessage));
          dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
        } else {
          dispatch(getSavedJobsSuccess(response.data.results));
        }
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(getSavedJobsFail(errorMessage));
        dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
      });
  }
}

export const getSavedJobsSuccess = (savedJobs) => {
  return {
    type: actionTypes.GET_SAVED_JOBS_SUCCESS,
    savedJobs: savedJobs
  }
}

export const getSavedJobsFail = (error) => {
  return {
    type: actionTypes.GET_SAVED_JOBS_FAIL,
    error: error
  }
}

export const getSavedJobs = (token, userId) => {
  return (dispatch) => {
    dispatch(getSavedJobsStart());

    firebaseAxios.get(`/${userId}/saved-jobs.json?auth=${token}&orderBy="order"`)
      .then((response) => {
        const savedJobs = [];
        for(let key in response.data) {
          savedJobs.push({
            ...response.data[key],
            jobId: key
          });
        }

        dispatch(getSavedJobsFind(savedJobs));
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(getSavedJobsFail(errorMessage));
        dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
      });
  }
}

export const removeSavedJobStart = () => {
  return {
    type: actionTypes.REMOVE_SAVED_JOB_START
  }
}

export const removeSavedJobSuccess = () => {
  return {
    type: actionTypes.REMOVE_SAVED_JOB_SUCCESS
  }
}

export const removeSavedJobFail = (error) => {
  return {
    type: actionTypes.REMOVE_SAVED_JOB_FAIL,
    error: error
  }
}

export const removeSavedJob = (token, userId, jobId) => {
  return (dispatch) => {
    dispatch(removeSavedJobStart());

    firebaseAxios.delete(`/${userId}/saved-jobs/${jobId}.json?auth=${token}`)
      .then((response) => {
        dispatch(getSavedJobs(token, userId));
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(removeSavedJobFail(errorMessage));
        dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
      });
  }
}
