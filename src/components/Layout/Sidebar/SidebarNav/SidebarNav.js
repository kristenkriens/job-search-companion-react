import React from 'react';

import SidebarNavGroup from './SidebarNavGroup/SidebarNavGroup';

const SidebarNav = (props) => {
  const { openSidebarNavGroup, sidebarNav, handleSidebarNavClick } = props;

  return (
    <nav>
      <ul className="sidebar__primary">
        {sidebarNav.map(group => (
          <SidebarNavGroup key={group.type} isOpen={group.type === openSidebarNavGroup} primaryItem={group.primaryItem} secondaryItems={group.secondaryItems} handleSidebarNavClick={() => handleSidebarNavClick(group.type)} />
        ))}
      </ul>
    </nav>
  )
}

export default SidebarNav;
