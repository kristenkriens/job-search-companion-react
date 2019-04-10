import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
  openNavGroup: 'find'
}

const changeOpenSidenavGroup = (state, action) => {
  const updatedState = {
    openNavGroup: action.navGroup
  };

  console.log(action.navGroup);

  return updateObject(state, updatedState);
}

const navigationReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_OPEN_SIDENAV_GROUP:
      return changeOpenSidenavGroup(state, action);
    default: return state;
  }
}

export default navigationReducer;
