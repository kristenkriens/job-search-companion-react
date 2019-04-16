import * as actionTypes from './actionTypes';

export const toggleModal = () => {
  return {
    type: actionTypes.TOGGLE_MODAL
  }
};

export const setActiveModal = (activeModal) => {
  return {
    type: actionTypes.SET_ACTIVE_MODAL,
    activeModal: activeModal
  }
};
