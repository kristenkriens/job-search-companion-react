import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './Modal.scss';
import Login from './Login/Login';
import Register from './Register/Register';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';

const Modal = (props) => {
  const { isModalOpen, activeModal, toggleModal, setActiveModal, clearAuthError } = props;

  const toggleModalAndClearAuthError = () => {
    clearAuthError();
    toggleModal();
  }

  return (
    <>
      <Backdrop isModalOpen={isModalOpen} close={toggleModalAndClearAuthError} />
      <CSSTransition
        in={isModalOpen}
        timeout={500}
        classNames="modal"
        unmountOnExit
      >
        <div className="modal">
          <Button additionalClasses="modal__close" click={toggleModalAndClearAuthError}><i className="fa fa-times" aria-hidden="true"></i></Button>
          <div className="modal__content">
            {activeModal === 'login' && (
              <Login setActiveModal={setActiveModal} />
            )}
            {activeModal === 'register' && (
              <Register setActiveModal={setActiveModal} />
            )}
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default Modal;
