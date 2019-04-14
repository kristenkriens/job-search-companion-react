import React from 'react';

import './Main.scss';
import Topbar from './Topbar/Topbar';

const Main = (props) => {
  const { routes } = props;

  return (
    <main id="main" className="main">
      <Topbar />
      {routes}
    </main>
  )
}

export default Main;
