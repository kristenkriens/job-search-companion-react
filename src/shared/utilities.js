export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const normalizeErrorString = (string) => {
  for(let i = 0; i < string.length; i++) {
    string = string.replace("_", " ").toLowerCase();
  }

  const normalizedString = string.charAt(0).toUpperCase() + string.slice(1);

  return normalizedString;
}

export const turnSpacesIntoPlusses = (string) => {
  for(let i = 0; i < string.length; i++) {
    string = string.replace(" ", "+");
  }

  return string;
}

export const turnDashesIntoSpacesAndCapitalize = (string) => {
  for(let i = 0; i < string.length; i++) {
    string = string.replace("-", " ");
  }

  const normalizedString = string.charAt(0).toUpperCase() + string.slice(1);

  return normalizedString;
}
