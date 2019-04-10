import React from 'react';

import SidebarNavGroupItems from './SidebarNavGroupItems/SidebarNavGroupItems';

const SidebarNavGroup = (props) => {
  const { group, isOpen, navGroupOpened } = props;

  let primaryItem = {};
  let secondaryItems = [];
  if(group === 'find') {
    primaryItem = {
      icon: 'search',
      title: 'Find Jobs'
    };
    secondaryItems = [
      { title: 'Search Form', link: '/', exact: true },
      { title: 'Map View', link: '/map-view', exact: false },
      { title: 'List View', link: '/list-view', exact: false }
    ];
  } else if(group === 'track') {
    primaryItem = {
      icon: 'book',
      title: 'Track Applications'
    };
    secondaryItems = [
      { title: 'Overview', link: '/overview', exact: false },
      { title: 'Follow Ups', link: '/follow-ups', exact: false },
      { title: 'Interviews', link: '/interviews', exact: false }
    ];
  } else if(group === 'analyze') {
    primaryItem = {
      icon: 'line-chart',
      title: 'Analyze'
    };
    secondaryItems = [
      { title: 'Applications', link: '/applications', exact: false },
      { title: 'Correspondence', link: '/correspondence', exact: false }
    ];
  }

  return (
    <>
      <SidebarNavGroupItems isOpen={isOpen} primaryItem={primaryItem} secondaryItems={secondaryItems} navGroupOpened={navGroupOpened} />
    </>
  )
}

export default SidebarNavGroup;
