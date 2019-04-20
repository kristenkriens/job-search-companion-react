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

    let url = `https://ipapi.co/json`;

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

export const getUserLatLng = () => {
  let lat = null;
  let lng = null;
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    lng = position.coords.lngitude;
  });

  return {
    type: actionTypes.GET_USER_LAT_LNG,
    lat: lat,
    lng: lng
  }
};
