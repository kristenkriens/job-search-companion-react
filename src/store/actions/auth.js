import axios from 'axios';

import * as actionTypes from './actionTypes';
import { toggleModal, setActiveModal } from './modal';

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

export const auth = (email, password, isRegister) => {
  return (dispatch) => {
    dispatch(authStart());

    const apiKey = 'AIzaSyD8o9rQ1n2v-6uMZ3NRWpiGUUb38AKryNc';

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
        dispatch(toggleModal());
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
        dispatch(setActiveModal('error')); //TODO: setup error modal
      });
  }
};

export const authCheckState = () => {
  return dispatch => {
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
