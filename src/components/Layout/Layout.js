import React, { Component } from 'react';
import { connect } from 'react-redux';

import Skipnav from './Skipnav/Skipnav';
import Sidebar from './Sidebar/Sidebar';
import Modal from '../UI/Modal/Modal';
import Main from './Main/Main';
import Footer from './Footer/Footer';

class Layout extends Component {
  componentDidUpdate = (prevProps) => {
    if (this.props.pathname !== prevProps.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  render() {
    const { routes, breadcrumb } = this.props;

    return (
      <>
        <Skipnav />
        <Sidebar />
        <Modal />
        <Main routes={routes} breadcrumb={breadcrumb} />
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pathname: state.router.location.pathname,
    breadcrumb: state.navigation.breadcrumb
  }
}

export default connect(mapStateToProps)(Layout);
