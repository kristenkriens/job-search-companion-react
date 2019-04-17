import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './Modal.scss';
import Login from './Login/Login';
import Register from './Register/Register';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';

const Modal = (props) => {
  const { activeModal, toggleModal, setActiveModal } = props;

  return (
    <>
      <Backdrop close={toggleModal} />
      <div className="modal">
        <Button additionalClasses="modal__close" click={toggleModal}><i className="fa fa-times" aria-hidden="true"></i></Button>
        <div className="modal__content">
          {activeModal === 'login' && (
            <Login setActiveModal={setActiveModal} />
          )}
          {activeModal === 'register' && (
            <Register setActiveModal={setActiveModal} />
          )}
        </div>
      </div>
    </>
  )
}

export default Modal;
