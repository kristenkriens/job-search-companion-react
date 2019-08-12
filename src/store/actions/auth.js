import axios from 'axios';
import { push } from 'connected-react-router';

import * as actionTypes from './actionTypes';
import { closeModal } from './modal';
import { openAndSetActiveModal, openAndSetActiveModalAndMessage } from './modal';
import { setAuthLocalStorage, setErrorMessage, buildFirebaseAuthAccountsUrl } from '../../shared/utilities';
import firebaseStorageRef from '../../shared/firebaseStorage';

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

export const authSuccess = (token, userId, oobCode) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    oobCode: oobCode
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const authGetProfileStart = () => {
  return {
    type: actionTypes.AUTH_GET_PROFILE_START
  }
};

export const authGetProfileSuccess = (displayName, photoUrl) => {
  return {
    type: actionTypes.AUTH_GET_PROFILE_SUCCESS,
    displayName: displayName,
    photoUrl: photoUrl
  }
};

export const authGetProfileFail = (error) => {
  return {
    type: actionTypes.AUTH_GET_PROFILE_FAIL,
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

export const authDoneLoading = (error) => {
  return {
    type: actionTypes.AUTH_DONE_LOADING
  }
}

export const authSetPasswordResetCode = (oobCode) => {
  return {
    type: actionTypes.AUTH_SET_PASSWORD_RESET_CODE,
    oobCode: oobCode
  }
}

export const authClearPasswordResetCode = () => {
  return {
    type: actionTypes.AUTH_CLEAR_PASSWORD_RESET_CODE
  }
}

export const authClearPasswordReset = () => {
  return (dispatch) => {
    dispatch(authClearPasswordResetCode());
    dispatch(push({
      search: ''
    }));
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

    const url = isRegister ? buildFirebaseAuthAccountsUrl('signUp') : buildFirebaseAuthAccountsUrl('signInWithPassword');

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    axios.post(url, authData)
      .then((response) => {
        setAuthLocalStorage(response.data.idToken, response.data.expiresIn, response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
        dispatch(closeModal());

        if(isRegister) {
          setTimeout(() => {
            dispatch(openAndSetActiveModal('profile'));
          }, 250);
        }
      }).catch((error) => {
        const errorMessage = setErrorMessage(error);

        dispatch(authFail(errorMessage));

        const notWord = (word) => errorMessage.toLowerCase().indexOf(word) === -1;
        if(notWord('email') && notWord('password')) {
          dispatch(closeModal());
          setTimeout(() => {
            dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
          }, 250);
        }
      });
  }
};

export const authSetProfileGo = (token, displayName, photoUrl, isEdit) => {
  return (dispatch) => {
    const url = buildFirebaseAuthAccountsUrl('update');

    const authData = {
      idToken: token,
      displayName: displayName,
      photoUrl: photoUrl
    }

    axios.post(url, authData)
      .then((response) => {
        dispatch(authDoneLoading());
        dispatch(closeModal());
        setTimeout(() => {
          dispatch(openAndSetActiveModalAndMessage('success', `Your profile has been ${isEdit ? 'updated' : 'set'}!`));
        }, 250);
        dispatch(authGetProfile(token));
      }).catch((error) => {
        const errorMessage = setErrorMessage(error);

        dispatch(authFail(errorMessage));
        dispatch(closeModal());
        setTimeout(() => {
          dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
        }, 250);
      });
  }
}

export const authSetProfile = (token, displayName, photoUrl, isEdit) => {
  return (dispatch) => {
    dispatch(authStart());

    const photoUpdated = typeof(photoUrl) === 'object';
    if(photoUpdated) {
      const ref = firebaseStorageRef.child(photoUrl.name);

      ref.put(photoUrl)
      	.then((response) => {
          return ref.getDownloadURL();
      	})
      	.then((responsePhotoUrl) => {
          dispatch(authSetProfileGo(token, displayName, responsePhotoUrl, isEdit));
      	});
    } else {
      dispatch(authSetProfileGo(token, displayName, photoUrl, isEdit));
    }
  }
};

export const authGetProfile = (token) => {
  return (dispatch) => {
    dispatch(authGetProfileStart());

    const url = buildFirebaseAuthAccountsUrl('lookup');

    const authData = {
      idToken: token
    }

    axios.post(url, authData)
      .then((response) => {
        const { displayName, photoUrl, email } = response.data.users[0];

        dispatch(authGetProfileSuccess(displayName, photoUrl, email));
      }).catch((error) => {
        const errorMessage = setErrorMessage(error);

        dispatch(authGetProfileFail(errorMessage));
        setTimeout(() => {
          dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
        }, 250);
      });
  }
};

export const authForgotPassword = (email) => {
  return (dispatch) => {
    dispatch(authStart());

    const url = buildFirebaseAuthAccountsUrl('sendOobCode');

    const authData = {
      email: email,
      requestType: 'PASSWORD_RESET'
    }

    axios.post(url, authData)
      .then((response) => {
        dispatch(authDoneLoading());
        dispatch(closeModal());
        dispatch(authClearPasswordResetCode());
        setTimeout(() => {
          dispatch(openAndSetActiveModalAndMessage('success', 'You will receive an email shortly with a link to reset your password!'));
        }, 250);
      }).catch((error) => {
        const errorMessage = setErrorMessage(error);

        dispatch(authFail(errorMessage));
        dispatch(closeModal());
        setTimeout(() => {
          dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
        }, 250);
      });
  }
};

export const authResetPassword = (code, newPassword) => {
  return (dispatch) => {
    dispatch(authStart());

    const url = buildFirebaseAuthAccountsUrl('resetPassword');

    const authData = {
      oobCode: code,
      newPassword: newPassword
    }

    axios.post(url, authData)
      .then((response) => {
        dispatch(authDoneLoading());
        dispatch(closeModal());
        setTimeout(() => {
          dispatch(openAndSetActiveModalAndMessage('success', 'Your password has been reset!'));
        }, 250);
      }).catch((error) => {
        const errorMessage = setErrorMessage(error);

        dispatch(authFail(errorMessage));
        dispatch(closeModal());
        setTimeout(() => {
          dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
        }, 250);
      });
  }
};

export const getNewTokenFromRefreshToken = (refreshToken) => {
  return (dispatch) => {
    dispatch(authStart());

    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

    let url = `https://securetoken.googleapis.com/v1/token?key=${apiKey}`;

    const authData = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }

    axios.post(url, authData)
      .then((response) => {
        setAuthLocalStorage(response.data.id_token, response.data.expires_in, response.data.user_id);

        dispatch(authSuccess(response.data.id_token, response.data.user_id));
        dispatch(checkAuthTimeout(response.data.expires_in));
      }).catch((error) => {
        const errorMessage = setErrorMessage(error);

        dispatch(authFail(errorMessage));
        setTimeout(() => {
          dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
        }, 250);
      });
  }
};

export const authUpdatePassword = (token, newPassword) => {
  return (dispatch) => {
    dispatch(authStart());

    const url = buildFirebaseAuthAccountsUrl('update');

    console.log(token);

    const authData = {
      idToken: token,
      password: newPassword,
      returnSecureToken: true
    }

    axios.post(url, authData)
      .then((response) => {
        dispatch(authDoneLoading());
        dispatch(openAndSetActiveModalAndMessage('success', 'Your password has been updated!'));
        dispatch(getNewTokenFromRefreshToken(response.data.refreshToken));
      }).catch((error) => {
        const errorMessage = setErrorMessage(error);

        dispatch(authFail(errorMessage));
        setTimeout(() => {
          dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
        }, 250);
      });
  }
};

export const authCheckIfLoggedIn = () => {
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

export const authCheckIfPasswordReset = (search) => {
  return (dispatch) => {
    const oobCodeObject = search.match(/oobCode=([^&]*)/);

    if(oobCodeObject) {
      dispatch(authSetPasswordResetCode(oobCodeObject[1]));
      dispatch(openAndSetActiveModal('reset-password'));
    }
  }
}
