import axios from 'axios';

import * as actionTypes from './actionTypes';
import { turnSpacesIntoPlusses } from '../../shared/utilities';

export const getUserAgent = () => {
  return {
    type: actionTypes.GET_USER_AGENT,
    userAgent: navigator.userAgent
  }
};

export const getUserIpStart = () => {
  return {
    type: actionTypes.GET_USER_IP_START
  }
};

export const getUserIpSuccess = (userIp) => {
  return {
    type: actionTypes.GET_USER_IP_SUCCESS,
    userIp: userIp
  }
};

export const getUserIp = () => {
  return (dispatch) => {
    dispatch(getUserIpStart());

    let url = `https://ipapi.co/json`;

    axios.post(url)
      .then((response) => {
        dispatch(getUserIpSuccess(response.data.ip));
      })
  }
};

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

    let url = `http://api.indeed.com/ads/apisearch?publisher=${apiKey}`;

    const searchData = {
      v: 2,
      userip: userIp,
      useragent: userAgent,
      format: 'json',
      q: turnSpacesIntoPlusses(query),
      l: turnSpacesIntoPlusses(location),
      radius: radius,
      jt: jobType !== 'nopreference' ? jobType : undefined,
      limit: 25,
      fromage: age,
      highlight: 1,
      latlong: 1,
      co: country
    }

    // http://api.indeed.com/ads/apisearch?publisher=1211867702868069&latlong=1&co=ca&format=json&userip=99.245.198.187&useragent=Mozilla/%2F4.0%28Firefox%29&v=2

    axios.post(url, searchData)
      .then((response) => {
        dispatch(searchSuccess(response));
      })
      .catch((error) => {
        dispatch(searchFail(error));
      });
  }
};
