import React from 'react';

const PrimarySidebarNavItem = (props) => {
  const { children, isOpen, handleNavGroupClick } = props;

  return (
    <li>
      <button className={`sidebar__primary-item ${isOpen ? 'sidebar__primary-item--open' : ''}`} onClick={handleNavGroupClick}>
        {children}
      </button>
    </li>
  )
}

export default PrimarySidebarNavItem;
