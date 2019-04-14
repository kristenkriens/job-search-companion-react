import * as actionTypes from './actionTypes';

export const toggleModal = () => {
  return {
    type: actionTypes.TOGGLE_MODAL
  }
};

export const setActiveModal = (modalType) => {
  return {
    type: actionTypes.SET_ACTIVE_MODAL,
    activeModal: modalType
  }
};
