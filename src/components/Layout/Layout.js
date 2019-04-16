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
    const { routes, isAuthenticated, breadcrumb, isModalOpen, activeModal, toggleModal, setActiveModal } = this.props;

    return (
      <div className={isAuthenticated ? 'logged-in' : 'logged-out'}>
        <Skipnav />
        <Sidebar />
        {isModalOpen && (
          <Modal activeModal={activeModal} toggleModal={toggleModal} setActiveModal={setActiveModal} />
        )}
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
    activeModal: state.modal.activeModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(actions.toggleModal()),
    setActiveModal: (activeModal) => dispatch(actions.setActiveModal(activeModal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
