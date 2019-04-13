import React from 'react';

const PrimarySidebarNavItem = (props) => {
  const { children, isOpen, handleSidebarNavClick } = props;

  return (
    <li>
      <button className={`sidebar__primary-item ${isOpen ? 'sidebar__primary-item--open' : ''}`} onClick={handleSidebarNavClick}>
        {children}
      </button>
    </li>
  )
}

export default PrimarySidebarNavItem;
