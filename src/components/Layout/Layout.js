import React, { Component } from 'react';

import Skipnav from './Skipnav/Skipnav';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import Footer from './Footer/Footer';

class Layout extends Component {
  render() {
    const { routes, isAuthenticated } = this.props;

    return (
      <>
        <Skipnav />
        <Sidebar />
        <Main isAuthenticated={isAuthenticated} routes={routes} />
        <Footer />
      </>
    )
  }
}

export default Layout;
