import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isModalOpen: false
}

const toggleModal = (state, action) => {
  const updatedState = {
    isModalOpen: !state.isModalOpen
  };

  return updateObject(state, updatedState);
}

const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.TOGGLE_MODAL:
      return toggleModal(state, action);
    default: return state;
  }
}

export default modalReducer;
