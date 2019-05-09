import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './Modal.scss';
import Login from './Login/Login';
import Register from './Register/Register';
import Error from './Error/Error';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';

const Modal = (props) => {
  const { isModalOpen, activeModal, message, closeModal, openAndSetActiveModal, clearAuthError } = props;

  const close = () => {
    closeModal();

    if(activeModal === 'login' || activeModal === 'register') {
      clearAuthError();
    }
  }

  const changeActive = (newActiveModal) => {
    closeModal();
    setTimeout(() => {
      clearAuthError();
      openAndSetActiveModal(newActiveModal);
    }, 250);
  }

  return (
    <>
      <Backdrop isModalOpen={isModalOpen} close={close} />
      <CSSTransition
        in={isModalOpen}
        timeout={500}
        classNames="modal"
        unmountOnExit
      >
        <div className="modal">
          <Button additionalClasses="modal__close" click={close}><i className="fa fa-times" aria-hidden="true"></i></Button>
          <div className="modal__content">
            {activeModal === 'login' && (
              <Login click={() => changeActive('register')} />
            )}
            {activeModal === 'register' && (
              <Register click={() => changeActive('login')} />
            )}
            {activeModal === 'error' && (
              <Error message={message} />
            )}
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default Modal;
