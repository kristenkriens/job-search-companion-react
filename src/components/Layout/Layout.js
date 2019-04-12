import React, { Component } from 'react';

import Skipnav from './Skipnav/Skipnav';
import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';
import Footer from './Footer/Footer';

class Layout extends Component {
  render() {
    const { children, isAuthenticated } = this.props;

    return (
      <>
        <Skipnav />
        <Sidebar />
        <main id="main" className="main">
          <Topbar isAuthenticated={isAuthenticated} />
          {children}
        </main>
        <Footer />
      </>
    )
  }
}

export default Layout;
