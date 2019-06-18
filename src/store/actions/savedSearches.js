import firebaseAxios from '../../shared/firebaseAxios';
import * as actionTypes from './actionTypes';
import { searchFormUpdateElement } from './search';
import { openAndSetActiveModalAndMessage } from './modal';

export const setSavedSearchStart = () => {
  return {
    type: actionTypes.SET_SAVED_SEARCH_START
  }
}

export const setSavedSearchSuccess = (searchId, savedSearch) => {
  return {
    type: actionTypes.SET_SAVED_SEARCH_SUCCESS,
    searchId: searchId,
    savedSearch: savedSearch
  }
}

export const setSavedSearchFail = (error) => {
  return {
    type: actionTypes.SET_SAVED_SEARCH_FAIL,
    error: error
  }
}

export const setSavedSearch = (token, userId, savedSearch) => {
  return (dispatch) => {
    dispatch(setSavedSearchStart());

    firebaseAxios.post(`/${userId}/saved-searches.json?auth=${token}`, savedSearch)
      .then((response) => {
        dispatch(setSavedSearchSuccess(response.data.name, savedSearch));
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(setSavedSearchFail(errorMessage));
        dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
      });
  }
}

export const getSavedSearchesStart = () => {
  return {
    type: actionTypes.GET_SAVED_SEARCHES_START
  }
}

export const getSavedSearchesSuccess = (savedSearches) => {
  return {
    type: actionTypes.GET_SAVED_SEARCHES_SUCCESS,
    savedSearches: savedSearches
  }
}

export const getSavedSearchesFail = (error) => {
  return {
    type: actionTypes.GET_SAVED_SEARCHES_FAIL,
    error: error
  }
}

export const getSavedSearches = (token, userId) => {
  return (dispatch) => {
    dispatch(getSavedSearchesStart());

    firebaseAxios.get(`/${userId}/saved-searches.json?auth=${token}&orderBy="order"&limitToLast=10`)
      .then((response) => {
        const savedSearches = [];
        for(let key in response.data) {
          savedSearches.push({
            ...response.data[key],
            searchId: key
          });
        }

        dispatch(getSavedSearchesSuccess(savedSearches));
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(getSavedSearchesFail(errorMessage));
        dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
      });
  }
}

export const useSavedSearchStart = () => {
  return {
    type: actionTypes.USE_SAVED_SEARCH_START
  }
}

export const useSavedSearchSuccess = (savedSearch) => {
  return {
    type: actionTypes.USE_SAVED_SEARCH_SUCCESS
  }
}

export const useSavedSearchDone = (savedSearch) => {
  return (dispatch) => {
    for(let key in savedSearch) {
      dispatch(searchFormUpdateElement(key, savedSearch[key]));
    }
  }
}

export const useSavedSearchFail = (error) => {
  return {
    type: actionTypes.USE_SAVED_SEARCH_FAIL,
    error: error
  }
}

export const useSavedSearch = (token, userId, searchId) => {
  return (dispatch) => {
    dispatch(useSavedSearchStart());

    firebaseAxios.get(`/${userId}/saved-searches.json?auth=${token}`)
      .then((response) => {
        let savedSearch = '';
        for (let key in response.data) {
          if(key === searchId) {
            savedSearch = response.data[key];
          }
        }

        dispatch(useSavedSearchSuccess());
        dispatch(useSavedSearchDone(savedSearch));
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(useSavedSearchFail(errorMessage));
        dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
      });
  }
}

export const removeSavedSearchStart = () => {
  return {
    type: actionTypes.REMOVE_SAVED_SEARCH_START
  }
}

export const removeSavedSearchSuccess = () => {
  return {
    type: actionTypes.REMOVE_SAVED_SEARCH_SUCCESS
  }
}

export const removeSavedSearchFail = (error) => {
  return {
    type: actionTypes.REMOVE_SAVED_SEARCH_FAIL,
    error: error
  }
}

export const removeSavedSearch = (token, userId, searchId) => {
  return (dispatch) => {
    dispatch(removeSavedSearchStart());

    firebaseAxios.delete(`/${userId}/saved-searches/${searchId}.json?auth=${token}`)
      .then((response) => {
        dispatch(removeSavedSearchSuccess());
        dispatch(getSavedSearches(token, userId));
      }).catch((error) => {
        const errorMessage = error.message;

        dispatch(removeSavedSearchFail(errorMessage));
        dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
      });
  }
}
