import React from 'react';

import './Main.scss';
import Topbar from './Topbar/Topbar';
import Content from './Content/Content';

const Main = (props) => {
  const { routes, breadcrumb } = props;

  return (
    <main id="main" className="main">
      <Topbar breadcrumb={breadcrumb} />
      <Content>
        {routes}
      </Content>
    </main>
  )
}

export default Main;
