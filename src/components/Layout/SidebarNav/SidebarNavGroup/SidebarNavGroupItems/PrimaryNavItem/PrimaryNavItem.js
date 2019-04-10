import React from 'react';

const PrimaryNavItem = (props) => {
  const { children, isOpen, navGroupOpened } = props;

  return (
    <li>
      <button className={`sidebar__primary-item ${isOpen ? 'sidebar__primary-item--open' : ''} not-button`} onClick={navGroupOpened}>
        {children}
      </button>
    </li>
  )
}

export default PrimaryNavItem;
