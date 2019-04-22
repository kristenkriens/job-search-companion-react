import axios from 'axios';

import * as actionTypes from './actionTypes';
import { turnSpacesIntoPlusses } from '../../shared/utilities';


export const searchStart = () => {
  return {
    type: actionTypes.SEARCH_START
  }
};

export const searchSuccess = () => {
  return {
    type: actionTypes.SEARCH_SUCCESS
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

    const url = `http://api.indeed.com/ads/apisearch?publisher=${apiKey}`;

    // http://api.indeed.com/ads/apisearch?publisher=1211867702868069&latlong=1&co=ca&format=json&userip=99.245.198.187&useragent=Mozilla/%2F4.0%28Firefox%29&v=2

    const searchData = {
      v: 2,
      userip: userIp,
      useragent: userAgent,
      format: 'json',
      q: turnSpacesIntoPlusses(query),
      l: turnSpacesIntoPlusses(location),
      radius: radius,
      jt: jobType === 'nopreference' ? undefined : jobType,
      limit: 25,
      fromage: age,
      highlight: 1,
      latlong: 1,
      co: country
    }

    axios.get(url, searchData)
      .then((response) => {
        dispatch(searchSuccess(response));
      })
      .catch((error) => {
        dispatch(searchFail(error));
      });
  }
};
