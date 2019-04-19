import axios from 'axios';

import * as actionTypes from './actionTypes';

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

export const search = (email, password, isRegister) => {
  return (dispatch) => {
    dispatch(searchStart());

    const apiKey = process.env.REACT_APP_MAPBOX_API_KEY;

    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;

    if(isRegister) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
    }

    const searchData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    axios.post(url, searchData)
      .then((response) => {
        dispatch(searchSuccess(response.data));
      })
      .catch((error) => {
        dispatch(searchFail(error.response.data.error));
      });
  }
};
