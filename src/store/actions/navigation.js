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

  let group = '';
  let current = '';
  sidebarNav.forEach((navItem) => {
    if(navItem.type === pathItems[1]) {
      group = navItem.primaryItem.title;

      navItem.secondaryItems.forEach((secondaryNavItem) => {
        if(secondaryNavItem.link === path) {
          current = secondaryNavItem.title;
        }
      });
    }
  });

  const breadcrumb = {
    group: group,
    current: current ? current : 'Home'
  }

  return {
    type: actionTypes.GET_SET_BREADCRUMB,
    breadcrumb: breadcrumb
  }
};
