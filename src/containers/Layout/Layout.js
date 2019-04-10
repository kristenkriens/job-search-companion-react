import React, { Component } from 'react';
import { connect } from 'react-redux';

import Skipnav from '../../components/Shared/Skipnav/Skipnav';
import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';
import Footer from '../../components/Shared/Footer/Footer';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <>
        <Skipnav />
        <Sidebar isAuthenticated={this.props.isAuthenticated} />
        <main id="main" className="main">
          <Topbar isAuthenticated={this.props.isAuthenticated} />
          <div className="content">
            {children}
          </div>
        </main>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
