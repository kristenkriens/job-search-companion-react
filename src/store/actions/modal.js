import * as actionTypes from './actionTypes';

export const setOpenModal = (openModal) => {
  return {
    type: actionTypes.SET_OPEN_MODAL,
    openModal: openModal
  }
};
