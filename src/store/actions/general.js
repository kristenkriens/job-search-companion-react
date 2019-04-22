import * as actionTypes from './actionTypes';

export const updateReduxHandledFormElement = (formElementName, value) => {
  console.log(value);
  return {
    type: actionTypes.UPDATE_REDUX_HANDLED_FORM_ELEMENT,
    formElementName: formElementName,
    value: value
  }
};
