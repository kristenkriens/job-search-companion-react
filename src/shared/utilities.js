export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const turnSpacesIntoPlusses = (string) => {
  return string.replace(/ /g, "+");
}

export const normalizeErrorString = (string) => {
  const spacedString = string.replace(/_/g, " ").toLowerCase();
  const normalizedString = spacedString.charAt(0).toUpperCase() + spacedString.slice(1);

  return normalizedString;
}

export const turnDashesIntoSpacesAndCapitalize = (string) => {
  const spacedString = string.replace(/-/g, " ");
  const normalizedString = spacedString.charAt(0).toUpperCase() + spacedString.slice(1);

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
