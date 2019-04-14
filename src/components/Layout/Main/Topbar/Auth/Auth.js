import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../UI/Modal/Modal';
import Login from './Login/Login';

import * as actions from '../../../../../store/actions/index';

class Auth extends Component {
  render() {
    const { isAuthenticated, isModalOpen, toggleModal } = this.props;

    return (
      <div className="topbar__auth">
        {isAuthenticated ? (
          <div>Hello, Anonymous! <button className="underline">(Logout)</button></div>
        ) : (
          <>
            <button onClick={toggleModal}>Log In / Create Account</button>
            <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
              <Login />
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
    toggleModal: () => dispatch(actions.toggleModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
