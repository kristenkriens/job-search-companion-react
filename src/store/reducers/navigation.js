import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  openSidebarNavGroup: '',
  sidebarNav: [
    {
      type: 'find',
      primaryItem: {
        icon: 'search',
        title: 'Find Jobs'
      },
      secondaryItems: [
        { title: 'Search', link: '/find/search', exact: false },
        { title: 'Search Results', link: '/find/search-results', exact: false },
        { title: 'Saved Jobs', link: '/find/saved-jobs', exact: false }
      ]
    },
    {
      type: 'track',
      primaryItem: {
        icon: 'book',
        title: 'Track Applications'
      },
      secondaryItems: [
        { title: 'Applications', link: '/track/applications', exact: false },
        { title: 'Results', link: '/track/results', exact: false }
      ]
    }
  ],
  breadcrumb: {
    group: '',
    current: ''
  }
}

const changeOpenSidebarNavGroup = (state, action) => {
  const updatedState = {
    openSidebarNavGroup: state.openSidebarNavGroup !== action.openSidebarNavGroup ? action.openSidebarNavGroup : ''
  };

  return updateObject(state, updatedState);
}

const getSetBreadcrumb = (state, action) => {
  const updatedState = {
    breadcrumb: action.breadcrumb
  };

  return updateObject(state, updatedState);
}


const navigationReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_OPEN_SIDEBAR_NAV_GROUP:
      return changeOpenSidebarNavGroup(state, action);
    case actionTypes.GET_SET_BREADCRUMB:
      return getSetBreadcrumb(state, action);
    default: return state;
  }
}

export default navigationReducer;
