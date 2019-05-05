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

export const setSavedSearch = (token, savedSearch) => {
  return (dispatch) => {
    dispatch(setSavedSearchStart());

    firebaseAxios.post(`/saved-searches.json?auth=${token}`, savedSearch)
      .then((response) => {
        dispatch(setSavedSearchSuccess(response.data.name, savedSearch));
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

    firebaseAxios.get(`/saved-searches.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
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

export const useSavedSearchStart = () => {
  return {
    type: actionTypes.USE_SAVED_SEARCH_START
  }
}

export const useSavedSearchSuccess = (response) => {
  // add to state of form

  return {
    type: actionTypes.USE_SAVED_SEARCH_SUCCESS
  }
}

export const useSavedSearchFail = (error) => {
  return {
    type: actionTypes.USE_SAVED_SEARCH_FAIL,
    error: error
  }
}

export const useSavedSearch = (token, id) => {
  return (dispatch) => {
    dispatch(useSavedSearchStart());

    firebaseAxios.get(`/saved-searches.json?auth=${token}&orderBy="id"&equalTo="${id}"`)
      .then((response) => {
        console.log(response.data);
        dispatch(useSavedSearchSuccess(response.data));
      }).catch((error) => {
        dispatch(useSavedSearchFail(error));
      });
  }
}

export const removeSavedSearchStart = () => {
  return {
    type: actionTypes.REMOVE_SAVED_SEARCH_START
  }
}

export const removeSavedSearchSuccess = (response) => {
  // call get function again and/or update savedSearches array

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

export const removeSavedSearch = (token, id) => {
  return (dispatch) => {
    dispatch(removeSavedSearchStart());

    console.log(id);

    firebaseAxios.delete(`/saved-searches.json?auth=${token}&orderBy="id"&equalTo="${id}"`)
      .then((response) => {
        console.log(response.data);
        dispatch(removeSavedSearchSuccess(response.data));
      }).catch((error) => {
        dispatch(removeSavedSearchFail(error));
      });
  }
}
