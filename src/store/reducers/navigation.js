import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  openSidebarNavGroup: ''
}

const changeOpenSidebarNavGroup = (state, action) => {
  const updatedState = {
    openSidebarNavGroup: action.sidebarNavGroup
  };

  return updateObject(state, updatedState);
}

const navigationReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_OPEN_SIDEBAR_NAV_GROUP:
      return changeOpenSidebarNavGroup(state, action);
    default: return state;
  }
}

export default navigationReducer;
