import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  location: '',
  country: 'ca'
}

const updateReduxHandledFormElement = (state, action) => {
  const updatedState = {
    [action.formElementName]: action.value
  };

  return updateObject(state, updatedState);
}

const generalReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_REDUX_HANDLED_FORM_ELEMENT: return updateReduxHandledFormElement(state, action);
    default: return state;
  }
}

export default generalReducer;
