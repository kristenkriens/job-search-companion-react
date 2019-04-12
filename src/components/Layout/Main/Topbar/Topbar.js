import React from 'react';

import './Topbar.scss';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import Auth from './Auth/Auth';

const Topbar = (props) => {
  const { isAuthenticated } = props;

  return (
    <div className="topbar">
      <Breadcrumb />
      <Auth isAuthenticated={isAuthenticated} />
    </div>
  )
}

export default Topbar;
