import * as actionTypes from './actionTypes';
import firebaseAxios from '../../shared/firebaseAxios';

export const setSavedSearchStart = () => {
  return {
    type: actionTypes.SET_SAVED_SEARCH_START
  }
}

export const setSavedSearchSuccess = (id, savedSearch) => {
  return {
    type: actionTypes.SET_SAVED_SEARCH_SUCCESS,
    id: id,
    savedSearch: savedSearch
  }
}

export const setSavedSearchFail = (error) => {
  return {
    type: actionTypes.SET_SAVED_SEARCH_FAIL,
    error: error
  }
}

export const setSavedSearch = (savedSearch, token) => {
  return (dispatch) => {
    dispatch(setSavedSearchStart());

    firebaseAxios.post(`/saved-searches.json?auth=${token}`, savedSearch)
      .then((response) => {
        dispatch(setSavedSearchSuccess(savedSearch));
      }).catch((error) => {
        dispatch(setSavedSearchFail(error));
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

    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

    firebaseAxios.get(`/saved-searches.json${queryParams}`)
      .then((response) => {
        const savedSearches = [];
        for(let key in response.data) {
          savedSearches.push({
            ...response.data[key],
            id: key
          });
        }

        dispatch(getSavedSearchesSuccess(savedSearches));
      })
      .catch((error) => {
        dispatch(getSavedSearchesFail(error));
      });
  }
}
