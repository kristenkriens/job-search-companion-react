import React from 'react';

import './Main.scss';
import Topbar from './Topbar/Topbar';

const Main = (props) => {
  const { routes, isAuthenticated, isModalOpen, toggleModal } = props;

  return (
    <main id="main" className="main">
      <Topbar isAuthenticated={isAuthenticated} isModalOpen={isModalOpen} toggleModal={toggleModal} />
      {routes}
    </main>
  )
}

export default Main;
