import React from 'react';
import { NavLink } from 'react-router-dom';

const SecondarySidebarNavItem = (props) => {
  const { children, link, exact } = props;

  return (
    <li>
      <NavLink to={link} exact={exact} className="sidebar__secondary-item" activeClassName="sidebar__secondary-item--active">
        {children}
      </NavLink>
    </li>
  )
}

export default SecondarySidebarNavItem;
