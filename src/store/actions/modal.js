import * as actionTypes from './actionTypes';

export const openModal = () => {
  return {
    type: actionTypes.OPEN_MODAL
  }
};

export const closeModal = () => {
  return {
    type: actionTypes.CLOSE_MODAL
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

export const openAndSetActiveModal = (activeModal) => {
  return (dispatch) => {
    dispatch(setActiveModal(activeModal));
    dispatch(openModal());
  }
};

export const openAndSetErrorModalAndMessage = (message) => {
  return (dispatch) => {
    dispatch(setActiveModal('error'));
    dispatch(setModalMessage(message));
    dispatch(openModal());
  }
};
