import React, { Component } from 'react';
import { connect } from 'react-redux';

import Skipnav from './Skipnav/Skipnav';
import Sidebar from './Sidebar/Sidebar';
import Modal from '../UI/Modal/Modal';
import Main from './Main/Main';
import Footer from './Footer/Footer';

import * as actions from '../../store/actions/index';

class Layout extends Component {
  componentDidUpdate = (prevProps) => {
    if (this.props.pathname !== prevProps.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  render() {
    const { routes, breadcrumb, isModalOpen, activeModal, message, closeModal, openAndSetActiveModal, clearAuthError } = this.props;

    return (
      <>
        <Skipnav />
        <Sidebar />
        <Modal isModalOpen={isModalOpen} activeModal={activeModal} message={message} closeModal={closeModal} openAndSetActiveModal={openAndSetActiveModal} clearAuthError={clearAuthError} />
        <Main routes={routes} breadcrumb={breadcrumb} />
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pathname: state.router.location.pathname,
    breadcrumb: state.navigation.breadcrumb,
    isModalOpen: state.modal.isModalOpen,
    activeModal: state.modal.activeModal,
    message: state.modal.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(actions.closeModal()),
    openAndSetActiveModal: (activeModal) => dispatch(actions.openAndSetActiveModal(activeModal)),
    clearAuthError: () => dispatch(actions.clearAuthError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
