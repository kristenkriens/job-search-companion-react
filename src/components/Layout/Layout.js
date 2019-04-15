import React, { Component } from 'react';
import { connect } from 'react-redux';

import Skipnav from './Skipnav/Skipnav';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import Footer from './Footer/Footer';

class Layout extends Component {
  render() {
    const { routes, isAuthenticated, breadcrumb } = this.props;

    return (
      <div className={isAuthenticated ? 'logged-in' : 'logged-out'}>
        <Skipnav />
        <Sidebar />
        <Main routes={routes} breadcrumb={breadcrumb} />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    breadcrumb: state.navigation.breadcrumb
  }
}

export default connect(mapStateToProps)(Layout);
