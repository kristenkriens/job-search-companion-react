import React, { Component } from 'react';

import Button from '../../Button/Button';
import Modal from '../Modal';
import Login from './Login/Login';
import Register from './Register/Register';

class AuthModal extends Component {
  state = {
    activeModal: ''
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
    const { isModalOpen, toggleModal, isButton, text } = this.props;

    console.log(isButton);

    return (
      <>
        {isButton ? (
          <Button click={() => this.toggleAndSetActiveModal('login')}>{text}</Button>
        ) : (
          <button onClick={() => this.toggleAndSetActiveModal('login')}>{text}</button>
        )}
        <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
          {this.state.activeModal === 'login' && (
            <Login setActiveModal={this.setActiveModal} />
          )}
          {this.state.activeModal === 'register' && (
            <Register setActiveModal={this.setActiveModal} />
          )}
        </Modal>
      </>
    )
  }
}

export default AuthModal;
