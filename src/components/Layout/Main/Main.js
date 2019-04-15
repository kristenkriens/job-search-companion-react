import React from 'react';

import './Main.scss';
import Topbar from './Topbar/Topbar';

const Main = (props) => {
  const { routes, breadcrumb } = props;

  return (
    <main id="main" className="main">
      <Topbar breadcrumb={breadcrumb} />
      {routes}
    </main>
  )
}

export default Main;
