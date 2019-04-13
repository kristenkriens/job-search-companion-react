import React from 'react';

import PrimarySidebarNavItem from './PrimarySidebarNavItem/PrimarySidebarNavItem';
import SecondarySidebarNavItem from './SecondarySidebarNavItem/SecondarySidebarNavItem';

const SidebarNavGroup = (props) => {
  const { primaryItem, secondaryItems, isOpen, handleSidebarNavClick } = props;

  return (
    <>
      <PrimarySidebarNavItem isOpen={isOpen} handleSidebarNavClick={handleSidebarNavClick}>
        <i className={`fa fa-${primaryItem.icon}`} aria-hidden="true" />
        {primaryItem.title}
      </PrimarySidebarNavItem>
      {isOpen && (
        <ul className="sidebar__secondary">
          {secondaryItems.map(secondaryItem => (
            <SecondarySidebarNavItem key={secondaryItem.title} link={secondaryItem.link} exact={secondaryItem.exact}>
              {secondaryItem.title}
            </SecondarySidebarNavItem>
          ))}
        </ul>
      )}
    </>
  )
}

export default SidebarNavGroup;
