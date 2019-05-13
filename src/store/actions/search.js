import axios from 'axios';

import * as actionTypes from './actionTypes';
import { turnSpacesIntoPlusses } from '../../shared/utilities';
import { history } from '../reducers/index';
import { openAndSetErrorModalAndMessage } from './modal';

export const searchFormUpdateElement = (formElementName, value) => {
  return {
    type: actionTypes.SEARCH_FORM_UPDATE_ELEMENT,
    formElementName: formElementName,
    value: value
  }
};

export const searchStart = () => {
  return {
    type: actionTypes.SEARCH_START
  }
};

export const searchSuccess = (data) => {
  return {
    type: actionTypes.SEARCH_SUCCESS,
    results: data.results,
    totalResults: data.totalResults
  }
};

export const searchFail = (error) => {
  return {
    type: actionTypes.SEARCH_FAIL,
    error: error
  }
}

export const searchGo = (searchCriteria) => {
  return (dispatch) => {
    dispatch(searchStart());

    const { userIp, userAgent, limit, sortBy, start, query, location, country, radius, jobType, age } = searchCriteria;

    const apiKey = process.env.REACT_APP_INDEED_API_KEY;

    const url = `https://cors-anywhere.herokuapp.com/http://api.indeed.com/ads/apisearch?publisher=${apiKey}&v=2&userip=${userIp}&useragent=${userAgent}&format=json&q=${turnSpacesIntoPlusses(query)}&l=${turnSpacesIntoPlusses(location)}&sort=${sortBy}&radius=${radius}&jt=${jobType === 'nopreference' ? undefined : jobType}&start=${start}&limit=${limit}&fromage=${age}&highlight=1&latlong=1&co=${country}`;

    axios.get(url)
      .then((response) => {
        if(response.data.error) {
          const errorMessage = response.data.error;

          dispatch(searchFail(errorMessage));
          dispatch(openAndSetErrorModalAndMessage(errorMessage));
        } else {
          dispatch(searchSuccess(response.data));
          history.push('/find/search-results');
        }
      })
      .catch((error) => {
        const errorMessage = error.message;

        dispatch(searchFail(errorMessage));
        dispatch(openAndSetErrorModalAndMessage(errorMessage));
      });
  }
};

export const searchClear = () => {
  return {
    type: actionTypes.SEARCH_CLEAR
  }
};

export const searchPaginationChangeDone = (start, currentPage) => {
  return {
    type: actionTypes.SEARCH_PAGINATION_CHANGE_DONE,
    start: start,
    currentPage: currentPage
  }
};

export const searchPaginationChange = (searchCriteria) => {
  return (dispatch) => {
    const { currentPage, limit } = searchCriteria;
    const { start, ...filteredSearchCriteria } = searchCriteria;

    let newStart = 0;
    if(currentPage <= 1) {
      newStart = 0;
    } else {
      newStart = (currentPage - 1) * limit;
    }

    const newSearchCriteria = {
      start: newStart,
      ...filteredSearchCriteria
    }

    dispatch(searchGo(newSearchCriteria));
    dispatch(searchPaginationChangeDone(newStart, currentPage));
  }
};

export const searchSortByChangeDone = (sortBy) => {
  return {
    type: actionTypes.SEARCH_SORT_BY_CHANGE_DONE,
    sortBy: sortBy
  }
};

export const searchSortByChange = (searchCriteria) => {
  return (dispatch) => {
    const { sortBy } = searchCriteria;

    dispatch(searchGo(searchCriteria));
    dispatch(searchSortByChangeDone(sortBy));
  }
};
