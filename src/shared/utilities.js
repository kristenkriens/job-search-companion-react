export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const turnSpacesIntoPlusses = (string) => {
  for(let i = 0; i < string.length; i++) {
    string = string.replace(/ /g, "+");
  }

  return string;
}

export const normalizeErrorString = (string) => {
  for(let i = 0; i < string.length; i++) {
    string = string.replace(/-/g, " ").toLowerCase();
  }

  const normalizedString = string.charAt(0).toUpperCase() + string.slice(1);

  return normalizedString;
}

export const turnDashesIntoSpacesAndCapitalize = (string) => {
  for(let i = 0; i < string.length; i++) {
    string = string.replace(/-/g, " ");
  }

  const normalizedString = string.charAt(0).toUpperCase() + string.slice(1);

  return normalizedString;
}

export const convertDate = (date) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const newDate = new Date(date);

  const year = newDate.getFullYear();

  const month = months[newDate.getMonth()];

  const day = newDate.getDate();

  return `${month} ${day}, ${year}`;
}
