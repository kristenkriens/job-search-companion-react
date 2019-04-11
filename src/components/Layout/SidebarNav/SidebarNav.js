import React from 'react';

import SidebarNavGroup from './SidebarNavGroup/SidebarNavGroup';

const SidebarNav = (props) => {
  const { openNavGroup, handleNavGroupClick } = props;

  const groups = [
    {
      type: 'find',
      primaryItem: {
        icon: 'search',
        title: 'Find Jobs'
      },
      secondaryItems: [
        { title: 'Search Form', link: '/', exact: true },
        { title: 'Map View', link: '/map-view', exact: false },
        { title: 'List View', link: '/list-view', exact: false }
      ]
    },
    {
      type: 'track',
      primaryItem: {
        icon: 'book',
        title: 'Track Applications'
      },
      secondaryItems: [
        { title: 'Overview', link: '/overview', exact: false },
        { title: 'Follow Ups', link: '/follow-ups', exact: false },
        { title: 'Interviews', link: '/interviews', exact: false }
      ]
    },
    {
      type: 'analyze',
      primaryItem: {
        icon: 'line-chart',
        title: 'Analyze'
      },
      secondaryItems: [
        { title: 'Applications', link: '/applications', exact: false },
        { title: 'Correspondence', link: '/correspondence', exact: false }
      ]
    }
  ];

  return (
    <nav>
      <ul className="sidebar__primary">
        {groups.map(group => (
          <SidebarNavGroup key={group.type} isOpen={group.type === openNavGroup} primaryItem={group.primaryItem} secondaryItems={group.secondaryItems} handleNavGroupClick={() => handleNavGroupClick(group.type)} />
        ))}
      </ul>
    </nav>
  )
}

export default SidebarNav;
