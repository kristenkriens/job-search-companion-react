import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

import './Modal.scss';

import Login from './Login/Login';
import Register from './Register/Register';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ResetUpdatePassword from './ResetUpdatePassword/ResetUpdatePassword';
import Profile from './Profile/Profile';
import Message from './Message/Message';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';

import * as actions from '../../../store/actions/index';

class Modal extends Component {
  close = () => {
    this.props.closeModal();

    if(this.props.activeModal === 'login' || this.props.activeModal === 'register') {
      this.props.clearAuthError();
    }

    if(this.props.activeModal === 'reset-password' || this.props.activeModal === 'success') {
      this.props.authClearPasswordReset();
    }
  }

  changeActive = (newActiveModal) => {
    this.props.closeModal();

    setTimeout(() => {
      this.props.clearAuthError();
      this.props.openAndSetActiveModal(newActiveModal);
    }, 250);
  }

  render() {
    const { isModalOpen, activeModal, message } = this.props;

    return (
      <>
        <Backdrop isOpen={isModalOpen} type="modal" close={this.close} />
        <CSSTransition
          in={isModalOpen}
          timeout={500}
          classNames="modal"
          unmountOnExit
        >
          <div className="modal">
            <Button additionalClasses="modal__close" click={this.close}><i className="fa fa-times" aria-hidden="true"></i></Button>
            <div className="modal__content">
              {activeModal === 'login' && (
                <Login click={() => this.changeActive('register')} ForgotPasswordClick={() => this.changeActive('forgot-password')} />
              )}
              {activeModal === 'register' && (
                <Register click={() => this.changeActive('login')} />
              )}
              {activeModal === 'forgot-password' && (
                <ForgotPassword click={() => this.changeActive('login')} />
              )}
              {(activeModal === 'reset-password' || activeModal === 'update-password') && (
                <ResetUpdatePassword type={activeModal} click={() => this.changeActive('login')} />
              )}
              {(activeModal === 'profile' || activeModal === 'edit-profile') && (
                <Profile type={activeModal} click={this.close} />
              )}
              {(activeModal === 'error' || activeModal === 'success') && (
                <Message type={activeModal} message={message} />
              )}
            </div>
          </div>
        </CSSTransition>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.modal.isModalOpen,
    activeModal: state.modal.activeModal,
    message: state.modal.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(actions.closeModal()),
    openAndSetActiveModal: (activeModal) => dispatch(actions.openAndSetActiveModal(activeModal)),
    clearAuthError: () => dispatch(actions.clearAuthError()),
    authClearPasswordReset: () => dispatch(actions.authClearPasswordReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
