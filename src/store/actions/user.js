import axios from 'axios';

import * as actionTypes from './actionTypes';


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

    const url = `https://ipapi.co/json`;

    axios.post(url)
      .then((response) => {
        dispatch(getUserIpSuccess(response.data.ip));
      })
  }
};

export const getUserAgent = () => {
  return {
    type: actionTypes.GET_USER_AGENT,
    userAgent: navigator.userAgent
  }
};

export const getUserLatLngStart = () => {
  return {
    type: actionTypes.GET_USER_LAT_LNG_START
  }
};

export const getUserLatLngSuccess = (coordinates) => {
  return {
    type: actionTypes.GET_USER_LAT_LNG_SUCCESS,
    lat: coordinates.latitude,
    lng: coordinates.longitude
  }
};

export const getUserLatLng = () => {
  return (dispatch) => {
    dispatch(getUserLatLngStart());

    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(getUserLatLngSuccess(position.coords));
    });
  }
};
