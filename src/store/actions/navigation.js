import * as actionTypes from './actionTypes';

export const changeOpenSidenavGroup = (navGroup) => {
  return {
    type: actionTypes.CHANGE_OPEN_SIDENAV_GROUP,
    navGroup: navGroup
  }
};
