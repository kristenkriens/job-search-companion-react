import * as actionTypes from './actionTypes';

export const changeOpenSidebarNavGroup = (sidebarNavGroup) => {
  return {
    type: actionTypes.CHANGE_OPEN_SIDEBAR_NAV_GROUP,
    openSidebarNavGroup: sidebarNavGroup
  }
};

export const getSetBreadcrumb = (sidebarNav) => {
  const path = window.location.pathname.replace('/job-search-companion', '');
  const pathItems = path.split('/');

  let breadcrumb = {};
  sidebarNav.forEach((sidebarNavItem) => {
    if(sidebarNavItem.type === pathItems[1]) {
      breadcrumb.group = sidebarNavItem.primaryItem.title;

      sidebarNavItem.secondaryItems.forEach((secondarySidebarNavItem) => {
        if(secondarySidebarNavItem.link === path) {
          breadcrumb.current = secondarySidebarNavItem.title;
        }
      });
    } else if (pathItems[1] === '') {
      breadcrumb.current = 'Home';
    }
  });

  return {
    type: actionTypes.GET_SET_BREADCRUMB,
    breadcrumb: breadcrumb
  }
};
