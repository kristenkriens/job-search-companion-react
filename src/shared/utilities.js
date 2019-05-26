import flow from 'lodash/flow';

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

export const normalizeErrorString = flow(
  turnUnderscoresIntoSpaces,
  lowercaseString,
  capitalizeFirstWordString
);

export const normalizeResultString = flow(
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
