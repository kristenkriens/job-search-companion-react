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

export const setModalMessage = (message) => {
  return {
    type: actionTypes.SET_MODAL_MESSAGE,
    message: message
  }
};

export const toggleAndSetActiveModal = (activeModal) => {
  return (dispatch) => {
    dispatch(setActiveModal(activeModal));
    dispatch(toggleModal());
  }
};

export const toggleAndSetActiveModalAndMessage = (activeModal, message) => {
  return (dispatch) => {
    dispatch(setActiveModal(activeModal));
    dispatch(setModalMessage(message));
    dispatch(toggleModal());
  }
};
