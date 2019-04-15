import React from 'react';

import './Topbar.scss';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import Auth from './Auth/Auth';

const Topbar = (props) => {
  const { breadcrumb } = props;

  return (
    <div className="topbar">
      <Breadcrumb breadcrumb={breadcrumb} />
      <Auth />
    </div>
  )
}

export default Topbar;
