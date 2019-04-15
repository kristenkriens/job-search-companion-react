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

  let groupTitle = '';
  let currentTitle = '';
  let currentLink = '';
  sidebarNav.forEach((navItem) => {
    if(navItem.type === pathItems[1]) {
      groupTitle = navItem.primaryItem.title;

      navItem.secondaryItems.forEach((secondaryNavItem) => {
        if(secondaryNavItem.link === path) {
          currentTitle = secondaryNavItem.title;
          currentLink = secondaryNavItem.link;
        }
      });
    }
  });

  const breadcrumb = {
    group: groupTitle,
    current: {
      title: currentTitle,
      link: currentLink
    }
  }

  return {
    type: actionTypes.GET_SET_BREADCRUMB,
    breadcrumb: breadcrumb
  }
};
