import React from 'react';

import PrimaryNavItem from './PrimaryNavItem/PrimaryNavItem';
import SecondaryNavItem from './SecondaryNavItem/SecondaryNavItem';

const SidebarNavGroup = (props) => {
  const { primaryItem, secondaryItems, isOpen, navGroupOpened } = props;

  return (
    <>
      <PrimaryNavItem isOpen={isOpen} navGroupOpened={navGroupOpened}>
        <i className={`fa fa-${primaryItem.icon}`} aria-hidden="true" />
        {primaryItem.title}
      </PrimaryNavItem>
      {isOpen && (
        <ul className="sidebar__secondary">
          {secondaryItems.map(secondaryItem => (
            <SecondaryNavItem key={secondaryItem.title} link={secondaryItem.link} exact={secondaryItem.exact}>
              {secondaryItem.title}
            </SecondaryNavItem>
          ))}
        </ul>
      )}
    </>
  )
}

export default SidebarNavGroup;
