import React from 'react';

import PrimarySidebarNavItem from './PrimarySidebarNavItem/PrimarySidebarNavItem';
import SecondarySidebarNavItem from './SecondarySidebarNavItem/SecondarySidebarNavItem';

const SidebarNavGroupItems = (props) => {
  const { primaryItem, secondaryItems, isOpen, navGroupOpened } = props;

  return (
    <>
      <PrimarySidebarNavItem isOpen={isOpen} navGroupOpened={navGroupOpened}>
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

export default SidebarNavGroupItems;
