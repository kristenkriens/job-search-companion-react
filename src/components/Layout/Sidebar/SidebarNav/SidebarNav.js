import React from 'react';

import SidebarNavGroup from './SidebarNavGroup/SidebarNavGroup';

const SidebarNav = (props) => {
  const { openSidebarNavGroup, handleSidebarNavClick } = props;

  const groups = [
    {
      type: 'find',
      primaryItem: {
        icon: 'search',
        title: 'Find Jobs'
      },
      secondaryItems: [
        { title: 'Search', link: '/find/search', exact: false },
        { title: 'Map View', link: '/find/map-view', exact: false },
        { title: 'List View', link: '/find/list-view', exact: false }
      ]
    },
    {
      type: 'track',
      primaryItem: {
        icon: 'book',
        title: 'Track Applications'
      },
      secondaryItems: [
        { title: 'Overview', link: '/track/overview', exact: false },
        { title: 'Follow Ups', link: '/track/follow-ups', exact: false },
        { title: 'Interviews', link: '/track/interviews', exact: false }
      ]
    },
    {
      type: 'analyze',
      primaryItem: {
        icon: 'line-chart',
        title: 'Analyze'
      },
      secondaryItems: [
        { title: 'Applications', link: '/analyze/applications', exact: false },
        { title: 'Correspondence', link: '/analyze/correspondence', exact: false }
      ]
    }
  ];

  return (
    <nav>
      <ul className="sidebar__primary">
        {groups.map(group => (
          <SidebarNavGroup key={group.type} isOpen={group.type === openSidebarNavGroup} primaryItem={group.primaryItem} secondaryItems={group.secondaryItems} handleSidebarNavClick={() => handleSidebarNavClick(group.type)} />
        ))}
      </ul>
    </nav>
  )
}

export default SidebarNav;
