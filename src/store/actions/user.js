import axios from 'axios';

import * as actionTypes from './actionTypes';
import { openAndSetActiveModalAndMessage } from './modal';

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

export const getUserIpFail = (error) => {
  return {
    type: actionTypes.GET_USER_IP_FAIL,
    error: error
  }
};

export const getUserIp = () => {
  return (dispatch) => {
    dispatch(getUserIpStart());

    const url = `https://ipapi.co/json`;

    axios.get(url)
      .then((response) => {
        dispatch(getUserIpSuccess(response.data.ip));
      }).catch((error) => {
        const errorMessage = 'Your IP address could not be found';

        dispatch(getUserIpFail(errorMessage));
        dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
      });
  }
};

export const getUserAgent = () => {
  return {
    type: actionTypes.GET_USER_AGENT,
    userAgent: navigator.userAgent
  }
};
