import React from 'react';
import { CSSTransition } from 'react-transition-group';

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
      <CSSTransition
        in={isOpen}
        timeout={500}
        classNames="slide"
        unmountOnExit
      >
        <ul className="sidebar__secondary">
          {secondaryItems.map(secondaryItem => (
            <SecondarySidebarNavItem key={secondaryItem.title} link={secondaryItem.link} exact={secondaryItem.exact}>
              {secondaryItem.title}
            </SecondarySidebarNavItem>
          ))}
        </ul>
      </CSSTransition>
    </>
  )
}

export default SidebarNavGroup;
