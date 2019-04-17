import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  openModal: null
}

const setOpenModal = (state, action) => {
  const updatedState = {
    openModal: action.openModal
  };

  return updateObject(state, updatedState);
}

const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_OPEN_MODAL:
      return setOpenModal(state, action);
    default: return state;
  }
}

export default modalReducer;
