import React from 'react';

import './Topbar.scss';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import Auth from './Auth/Auth';

const Topbar = (props) => {
  const { isAuthenticated, isModalOpen, toggleModal } = props;

  return (
    <div className="topbar">
      <Breadcrumb />
      <Auth isAuthenticated={isAuthenticated} isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  )
}

export default Topbar;
