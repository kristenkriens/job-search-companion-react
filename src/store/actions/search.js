import axios from 'axios';

import * as actionTypes from './actionTypes';
import { turnSpacesIntoPlusses } from '../../shared/utilities';


export const searchStart = () => {
  return {
    type: actionTypes.SEARCH_START
  }
};

export const searchSuccess = (results) => {
  return {
    type: actionTypes.SEARCH_SUCCESS,
    results: results
  }
};

export const searchFail = (error) => {
  return {
    type: actionTypes.SEARCH_FAIL,
    error: error
  }
}

export const search = (userAgent, userIp, query, location, country, radius, jobType, age) => {
  return (dispatch) => {
    dispatch(searchStart());

    const apiKey = process.env.REACT_APP_INDEED_API_KEY;

    const url = `https://cors-anywhere.herokuapp.com/http://api.indeed.com/ads/apisearch?publisher=${apiKey}&v=2&userip=${userIp}&useragent=${userAgent}&format=json&q=${turnSpacesIntoPlusses(query)}&l=${turnSpacesIntoPlusses(location)}&radius=${radius}&jt=${jobType === 'nopreference' ? undefined : jobType}&limit=25&fromage=${age}&highlight=1&latlong=1&co=${country}`;

    axios.get(url)
      .then((response) => {
        dispatch(searchSuccess(response.data.results));
      })
      .catch((error) => {
        dispatch(searchFail(error));
      });
  }
};
