import axios from 'axios';

import firebaseAxios from '../../shared/firebaseAxios';
import * as actionTypes from './actionTypes';
import { history } from '../reducers/index';

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
        history.push('/find/saved-jobs');
      }).catch((error) => {
        dispatch(setSavedJobFail(error));
      });
  }
}

export const getSavedJobsStart = () => {
  return {
    type: actionTypes.GET_SAVED_JOBS_START
  }
}

export const getSavedJobsFind = (savedJobsKeys) => {
  return (dispatch) => {
    const apiKey = process.env.REACT_APP_INDEED_API_KEY;

    const url = `https://cors-anywhere.herokuapp.com/http://api.indeed.com/ads/apigetjobs?publisher=${apiKey}&jobkeys=${savedJobsKeys}&v=2&format=json`;

    axios.get(url)
      .then((response) => {
        dispatch(getSavedJobsSuccess(response.data.results));
      })
      .catch((error) => {
        dispatch(getSavedJobsFail(error));
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

    firebaseAxios.get(`/${userId}/saved-jobs.json?auth=${token}&orderBy="date"&limitToLast=10`)
      .then((response) => {
        let savedJobsKeys = '';
        for(let key in response.data) {
          savedJobsKeys += response.data[key].jobkey + ',';
        }
        savedJobsKeys = savedJobsKeys.substring(0, savedJobsKeys.length - 1);

        dispatch(getSavedJobsFind(savedJobsKeys));
      })
      .catch((error) => {
        dispatch(getSavedJobsFail(error));
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
        dispatch(removeSavedJobSuccess());
        dispatch(getSavedJobs(token, userId));
      }).catch((error) => {
        dispatch(removeSavedJobFail(error));
      });
  }
}
