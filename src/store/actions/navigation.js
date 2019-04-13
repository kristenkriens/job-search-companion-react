import * as actionTypes from './actionTypes';

export const changeOpenSidebarNavGroup = (sidebarNavGroup) => {
  return {
    type: actionTypes.CHANGE_OPEN_SIDEBAR_NAV_GROUP,
    openSidebarNavGroup: sidebarNavGroup
  }
};
