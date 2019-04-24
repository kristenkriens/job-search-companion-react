import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  isModalOpen: false,
  activeModal: '',
  message: ''
}

const toggleModal = (state, action) => {
  const updatedState = {
    isModalOpen: !state.isModalOpen
  };

  return updateObject(state, updatedState);
}

const setActiveModal = (state, action) => {
  const updatedState = {
    activeModal: action.activeModal
  };

  return updateObject(state, updatedState);
}

const setModalMessage = (state, action) => {
  const updatedState = {
    message: action.message
  };

  return updateObject(state, updatedState);
}

const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.TOGGLE_MODAL:
      return toggleModal(state, action);
    case actionTypes.SET_ACTIVE_MODAL:
      return setActiveModal(state, action);
    case actionTypes.SET_MODAL_MESSAGE:
      return setModalMessage(state, action);
    default: return state;
  }
}

export default modalReducer;
