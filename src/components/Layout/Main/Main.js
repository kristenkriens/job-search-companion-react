import React from 'react';

import './Main.scss';
import Topbar from './Topbar/Topbar';

const Main = (props) => {
  const { routes, isAuthenticated } = props;

  return (
    <main id="main" className="main">
      <Topbar isAuthenticated={isAuthenticated} />
      {routes}
    </main>
  )
}

export default Main;
