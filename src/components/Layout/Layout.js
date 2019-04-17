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
    const { routes, isAuthenticated, breadcrumb, openModal, setOpenModal } = this.props;

    return (
      <div className={isAuthenticated ? 'logged-in' : 'logged-out'}>
        <Skipnav />
        <Sidebar />
        <Modal openModal={openModal} setOpenModal={setOpenModal} />
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
    openModal: state.modal.openModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenModal: (openModal) => dispatch(actions.setOpenModal(openModal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
