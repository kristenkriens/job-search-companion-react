import React from 'react';

const PrimarySidebarNavItem = (props) => {
  const { children, isOpen, handleNavClick } = props;

  return (
    <li>
      <button className={`sidebar__primary-item ${isOpen ? 'sidebar__primary-item--open' : ''}`} onClick={handleNavClick}>
        {children}
      </button>
    </li>
  )
}

export default PrimarySidebarNavItem;
