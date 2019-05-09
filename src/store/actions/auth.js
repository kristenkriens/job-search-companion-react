import axios from 'axios';

import * as actionTypes from './actionTypes';
import { closeModal } from './modal';
import { openAndSetErrorModalAndMessage } from './modal';
import { normalizeErrorString } from '../../shared/utilities';

export const clearAuthError = () => {
  return {
    type: actionTypes.CLEAR_AUTH_ERROR
  }
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  }
}

export const authGo = (email, password, isRegister) => {
  return (dispatch) => {
    dispatch(authStart());

    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;

    if(isRegister) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
    }

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    axios.post(url, authData)
      .then((response) => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
        dispatch(closeModal());
      }).catch((error) => {
        let errorMessage = '';
        if(error.response) {
          errorMessage = normalizeErrorString(error.response.data.error.message);
        } else {
          errorMessage = error.message;
        }

        dispatch(authFail(errorMessage));

        const notWord = (word) => errorMessage.toLowerCase().indexOf(word) === -1;
        if(notWord('email') && notWord('password')) {
          dispatch(closeModal());
          setTimeout(() => {
            dispatch(openAndSetErrorModalAndMessage(errorMessage));
          }, 250);
        }
      });
  }
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');

    if(!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if(expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}
