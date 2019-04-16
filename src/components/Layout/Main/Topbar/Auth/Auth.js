import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthModal from '../../../../UI/Modal/AuthModal/AuthModal';

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
          <AuthModal isModalOpen={isModalOpen} toggleModal={toggleModal} isButton={false} text="Login / Create Account" />
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
