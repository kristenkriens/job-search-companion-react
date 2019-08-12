import _flow from 'lodash/flow';
import { googleIdentityToolkitUrl } from './globalConfig';

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const turnSpacesIntoPlusses = (string) => string.replace(/ /g, "+");

export const turnUnderscoresIntoSpaces = (string) => string.replace(/_/g, " ");

export const turnDashesIntoSpaces = (string) => string.replace(/-/g, " ");

export const lowercaseString = (string) => string.toLowerCase();

export const capitalizeFirstWordString = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const normalizeErrorString = _flow(
  turnUnderscoresIntoSpaces,
  lowercaseString,
  capitalizeFirstWordString
);

export const normalizeResultString = _flow(
  turnDashesIntoSpaces,
  capitalizeFirstWordString
);

export const convertDate = (date) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const newDate = new Date(date);

  const year = newDate.getFullYear();

  const month = months[newDate.getMonth()];

  const day = newDate.getDate();

  return `${month} ${day}, ${year}`;
}

export const setErrorMessage = (error) => {
  return error.response ? normalizeErrorString(error.response.data.error.message) : error.message;
}

export const setAuthLocalStorage = (token, expiresIn, userId) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

  localStorage.setItem('token', token);
  localStorage.setItem('expirationDate', expirationDate);
  localStorage.setItem('userId', userId);
}

export const buildFirebaseAuthAccountsUrl = (action) => {
  const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

  return `${googleIdentityToolkitUrl.base}${googleIdentityToolkitUrl.accountsPath}:${action}?key=${apiKey}`;
}
