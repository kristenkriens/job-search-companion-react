import React, { Component } from 'react';
import { connect } from 'react-redux';

import Skipnav from './Skipnav/Skipnav';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import Footer from './Footer/Footer';

import * as actions from '../../store/actions/index';

class Layout extends Component {
  render() {
    const { routes, isAuthenticated, isModalOpen, toggleModal } = this.props;

    return (
      <div className={isAuthenticated ? 'logged-in' : 'logged-out'}>
        <Skipnav />
        <Sidebar />
        <Main routes={routes} isAuthenticated={isAuthenticated} isModalOpen={isModalOpen} toggleModal={toggleModal} />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    isModalOpen: state.modal.isModalOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    toggleModal: () => dispatch(actions.toggleModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
