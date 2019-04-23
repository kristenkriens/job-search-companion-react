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

export const toggleAndSetActiveModal = (activeModal) => {
  return (dispatch) => {
    dispatch(setActiveModal(activeModal));
    dispatch(toggleModal());
  }
};

export const setErrorMessage = (errorMessage) => {
  return {
    type: actionTypes.SET_ACTIVE_MODAL,
    errorMessage: errorMessage
  }
};

export const toggleAndSetErrorMessage = (errorMessage) => {
  return (dispatch) => {
    dispatch(setErrorMessage(errorMessage));
    dispatch(toggleModal());
  }
};
