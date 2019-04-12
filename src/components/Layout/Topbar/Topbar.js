import React from 'react';

import Breadcrumb from './Breadcrumb/Breadcrumb';
import Profile from './Profile/Profile';

const Topbar = (props) => {
  const { isAuthenticated } = props;

  return (
    <div className="topbar">
      <Breadcrumb />
      <Profile isAuthenticated={isAuthenticated} />
    </div>
  )
}

export default Topbar;
