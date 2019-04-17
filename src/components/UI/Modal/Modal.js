import React from 'react';

import './Modal.scss';
import Login from './Login/Login';
import Register from './Register/Register';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';

const Modal = (props) => {
  const { openModal, setOpenModal } = props;

  return (
    <>
      <Backdrop close={() => setOpenModal(null)} />
      <div className="modal">
        <Button additionalClasses="modal__close" click={() => setOpenModal(null)}><i className="fa fa-times" aria-hidden="true"></i></Button>
        <div className="modal__content">
          {openModal === 'login' && (
            <Login setOpenModal={setOpenModal} />
          )}
          {openModal === 'register' && (
            <Register setOpenModal={setOpenModal} />
          )}
        </div>
      </div>
    </>
  )
}

export default Modal;
