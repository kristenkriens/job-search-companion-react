import axios from 'axios';

import firebaseAxios from '../../shared/firebaseAxios';
import * as actionTypes from './actionTypes';
import { openAndSetErrorModalAndMessage } from './modal'

export const setSavedApplicationStart = () => {
  return {
    type: actionTypes.SET_SAVED_APPLICATION_START
  }
}

export const setSavedApplicationSuccess = (applicationId, savedApplication) => {
  return {
    type: actionTypes.SET_SAVED_APPLICATION_SUCCESS,
    applicationId: applicationId,
    savedApplication: savedApplication
  }
}

export const setSavedApplicationFail = (error) => {
  return {
    type: actionTypes.SET_SAVED_APPLICATION_FAIL,
    error: error
  }
}

export const setSavedApplication = (token, userId, savedApplication) => {
  return (dispatch) => {
    dispatch(setSavedApplicationStart());

    firebaseAxios.post(`/${userId}/saved-applications.json?auth=${token}`, savedApplication)
      .then((response) => {
        dispatch(setSavedApplicationSuccess(response.data.name, savedApplication));
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(setSavedApplicationFail(errorMessage));
        dispatch(openAndSetErrorModalAndMessage(errorMessage));
      });
  }
}

export const getSavedApplicationsStart = () => {
  return {
    type: actionTypes.GET_SAVED_APPLICATIONS_START
  }
}

export const getSavedApplicationsFind = (savedApplications, isRemove) => {
  return (dispatch) => {
    let savedApplicationsKeys = '';
    for(let key in savedApplications) {
      savedApplicationsKeys += savedApplications[key].jobkey + ',';
    }
    savedApplicationsKeys = savedApplicationsKeys.substring(0, savedApplicationsKeys.length - 1);

    const apiKey = process.env.REACT_APP_INDEED_API_KEY;

    const url = `https://cors-anywhere.herokuapp.com/http://api.indeed.com/ads/apigetjobs?publisher=${apiKey}&jobkeys=${savedApplicationsKeys}&v=2&format=json`;

    axios.get(url)
      .then((response) => {
        for(let key in savedApplications) {
          if(response.data.results[key] !== undefined) {
            response.data.results[key].applicationId = savedApplications[key].applicationId;
            response.data.results[key].applicationDate = savedApplications[key].applicationDate;
          }
        }

        if(response.data.error) {
          const errorMessage = response.data.error;

          dispatch(getSavedApplicationsFail(errorMessage));
          dispatch(openAndSetErrorModalAndMessage(errorMessage));
        } else {
          dispatch(getSavedApplicationsSuccess(response.data.results));

          if(isRemove) {
            dispatch(removeSavedApplicationSuccess());
          }
        }
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(getSavedApplicationsFail(errorMessage));
        dispatch(openAndSetErrorModalAndMessage(errorMessage));
      });
  }
}

export const getSavedApplicationsSuccess = (savedApplications) => {
  return {
    type: actionTypes.GET_SAVED_APPLICATIONS_SUCCESS,
    savedApplications: savedApplications
  }
}

export const getSavedApplicationsFail = (error) => {
  return {
    type: actionTypes.GET_SAVED_APPLICATIONS_FAIL,
    error: error
  }
}

export const getSavedApplications = (token, userId, isRemove) => {
  return (dispatch) => {
    dispatch(getSavedApplicationsStart());

    firebaseAxios.get(`/${userId}/saved-applications.json?auth=${token}`)
      .then((response) => {
        const savedApplications = [];
        for(let key in response.data) {
          savedApplications.push({
            ...response.data[key],
            applicationId: key,
            applicationDate: response.data[key].date
          });
        }

        dispatch(getSavedApplicationsFind(savedApplications, isRemove));
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(getSavedApplicationsFail(errorMessage));
        dispatch(openAndSetErrorModalAndMessage(errorMessage));
      });
  }
}

export const changeSavedApplicationsStart = () => {
  return {
    type: actionTypes.CHANGE_SAVED_APPLICATIONS_START
  }
}

export const changeSavedApplicationsSuccess = (savedApplications) => {
  return {
    type: actionTypes.CHANGE_SAVED_APPLICATIONS_SUCCESS,
    savedApplications: savedApplications
  }
}

export const changeSavedApplicationsFail = (error) => {
  return {
    type: actionTypes.CHANGE_SAVED_APPLICATIONS_FAIL,
    error: error
  }
}

export const changeSavedApplications = (token, userId, savedApplications) => {
  return (dispatch) => {
    dispatch(changeSavedApplicationsStart());

    firebaseAxios.put(`/${userId}/saved-applications.json?auth=${token}`, savedApplications)
      .then((response) => {
        dispatch(changeSavedApplicationsSuccess(savedApplications));
        dispatch(getSavedApplications(token, userId));
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(changeSavedApplicationsFail(errorMessage));
        dispatch(openAndSetErrorModalAndMessage(errorMessage));
      });
  }
}

export const removeSavedApplicationStart = () => {
  return {
    type: actionTypes.REMOVE_SAVED_APPLICATION_START
  }
}

export const removeSavedApplicationSuccess = () => {
  return {
    type: actionTypes.REMOVE_SAVED_APPLICATION_SUCCESS
  }
}

export const removeSavedApplicationFail = (error) => {
  return {
    type: actionTypes.REMOVE_SAVED_APPLICATION_FAIL,
    error: error
  }
}

export const removeSavedApplication = (token, userId, applicationId) => {
  return (dispatch) => {
    dispatch(removeSavedApplicationStart());

    firebaseAxios.delete(`/${userId}/saved-applications/${applicationId}.json?auth=${token}`)
      .then((response) => {
        dispatch(removeSavedApplicationSuccess());
        dispatch(getSavedApplications(token, userId));
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(removeSavedApplicationFail(errorMessage));
        dispatch(openAndSetErrorModalAndMessage(errorMessage));
      });
  }
}

export const removeSavedApplicationsStart = () => {
  return {
    type: actionTypes.REMOVE_SAVED_APPLICATIONS_START
  }
}

export const removeSavedApplicationsSuccess = () => {
  return {
    type: actionTypes.REMOVE_SAVED_APPLICATIONS_SUCCESS
  }
}

export const removeSavedApplicationsFail = (error) => {
  return {
    type: actionTypes.REMOVE_SAVED_APPLICATIONS_FAIL,
    error: error
  }
}

export const removeSavedApplications = (token, userId) => {
  return (dispatch) => {
    dispatch(removeSavedApplicationsStart());

    firebaseAxios.delete(`/${userId}/saved-applications.json?auth=${token}`)
      .then((response) => {
        dispatch(removeSavedApplicationsSuccess());
        dispatch(getSavedApplications(token, userId));
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(removeSavedApplicationsFail(errorMessage));
        dispatch(openAndSetErrorModalAndMessage(errorMessage));
      });
  }
}
