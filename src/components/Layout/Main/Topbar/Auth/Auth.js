import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../UI/Modal/Modal';
import Login from './Login/Login';
import Register from './Register/Register';

import * as actions from '../../../../../store/actions/index';

class Auth extends Component {
  state = {
    activeModal: 'login'
  }

  setActiveModal = (modalType) => {
    this.setState({
      activeModal: modalType
    })
  };

  toggleAndSetActiveModal = (modalType) => {
    const { toggleModal } = this.props;

    this.setActiveModal(modalType);
    toggleModal();
  }

  render() {
    const { isAuthenticated, logout, isModalOpen, toggleModal } = this.props;

    return (
      <div className="topbar__auth">
        {isAuthenticated ? (
          <div>Welcome! <button className="underline" onClick={logout}>(Logout)</button></div>
        ) : (
          <>
            <button onClick={() => this.toggleAndSetActiveModal('login')}>Log In / Create Account</button>
            <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
              {this.state.activeModal === 'login' && (
                <Login setActiveModal={this.setActiveModal} />
              )}
              {this.state.activeModal === 'register' && (
                <Register setActiveModal={this.setActiveModal} />
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
    isModalOpen: state.modal.isModalOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.authLogout()),
    toggleModal: () => dispatch(actions.toggleModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
