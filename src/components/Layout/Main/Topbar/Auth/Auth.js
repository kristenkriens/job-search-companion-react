import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../UI/Modal/Modal';
import Login from './Login/Login';
import Register from './Register/Register';

import * as actions from '../../../../../store/actions/index';

class Auth extends Component {
  toggleSetActiveModal = (modalType) => {
    const { setActiveModal, toggleModal } = this.props;

    setActiveModal(modalType);
    toggleModal();
  }

  render() {
    const { isAuthenticated, logout, isModalOpen, activeModal, toggleModal } = this.props;

    return (
      <div className="topbar__auth">
        {!isAuthenticated ? (
          <div>Welcome! <button className="underline" onClick={logout}>(Logout)</button></div>
        ) : (
          <>
            <button onClick={() => this.toggleSetActiveModal('login')}>Log In / Create Account</button>
            <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
              {activeModal === 'login' && (
                <Login />
              )}
              {activeModal === 'register' && (
                <Register />
              )}
            </Modal>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    isModalOpen: state.modal.isModalOpen,
    activeModal: state.modal.activeModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.authLogout()),
    toggleModal: () => dispatch(actions.toggleModal()),
    setActiveModal: (modalType) => dispatch(actions.setActiveModal(modalType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
