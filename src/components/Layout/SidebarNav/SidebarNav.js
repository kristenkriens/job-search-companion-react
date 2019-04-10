import React from 'react';

import SidebarNavGroup from './SidebarNavGroup/SidebarNavGroup';

const SidebarNav = (props) => {
  const { openNavGroup, navGroupOpened } = props;

  const groups = ['find', 'track', 'analyze'];

  return (
    <nav>
      <ul className="sidebar__primary">
        {groups.map(group => (
          <SidebarNavGroup key={group} group={group} isOpen={group === openNavGroup} navGroupOpened={() => navGroupOpened(group)} />
        ))}
      </ul>
    </nav>
  )
}

export default SidebarNav;
