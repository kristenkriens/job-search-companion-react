import React, { Component } from 'react';
import { connect } from 'react-redux';

import Skipnav from './Skipnav/Skipnav';
import Sidebar from './Sidebar/Sidebar';
import Modal from '../UI/Modal/Modal';
import Main from './Main/Main';
import Footer from './Footer/Footer';

import * as actions from '../../store/actions/index';

class Layout extends Component {
  render() {
    const { routes, isAuthenticated, breadcrumb, isModalOpen, activeModal, message, toggleModal, setActiveModal, clearAuthError } = this.props;

    return (
      <div className={isAuthenticated ? 'logged-in' : 'logged-out'}>
        <Skipnav />
        <Sidebar />
        <Modal isModalOpen={isModalOpen} activeModal={activeModal} message={message} toggleModal={toggleModal} setActiveModal={setActiveModal} clearAuthError={clearAuthError} />
        <Main routes={routes} breadcrumb={breadcrumb} />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    breadcrumb: state.navigation.breadcrumb,
    isModalOpen: state.modal.isModalOpen,
    activeModal: state.modal.activeModal,
    message: state.modal.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(actions.toggleModal()),
    setActiveModal: (activeModal) => dispatch(actions.setActiveModal(activeModal)),
    clearAuthError: () => dispatch(actions.clearAuthError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
