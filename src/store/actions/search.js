import axios from 'axios';

import * as actionTypes from './actionTypes';
import { turnSpacesIntoPlusses } from '../../shared/utilities';
import { history } from '../reducers/index';


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

export const searchGo = (userIp, userAgent, start, limit, query, location, country, radius, jobType, age) => {
  return (dispatch) => {
    dispatch(searchStart());

    const apiKey = process.env.REACT_APP_INDEED_API_KEY;

    const url = `https://cors-anywhere.herokuapp.com/http://api.indeed.com/ads/apisearch?publisher=${apiKey}&v=2&userip=${userIp}&useragent=${userAgent}&format=json&q=${turnSpacesIntoPlusses(query)}&l=${turnSpacesIntoPlusses(location)}&radius=${radius}&jt=${jobType === 'nopreference' ? undefined : jobType}&start=${start}&limit=${limit}&fromage=${age}&highlight=1&latlong=1&co=${country}`;

    axios.get(url)
      .then((response) => {
        dispatch(searchSuccess(response.data));
        history.push('/find/results');
      })
      .catch((error) => {
        dispatch(searchFail(error));
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

export const searchPaginationChange = (start, limit, currentPage, userIp, userAgent, query, location, country, radius, jobType, age) => {
  return (dispatch) => {
    dispatch(searchGo(userIp, userAgent, start, limit, query, location, country, radius, jobType, age));
    dispatch(searchPaginationChangeDone(start, currentPage));
  }
};
