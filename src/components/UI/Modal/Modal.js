import React from 'react';

import './Modal.scss';

import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';

const Modal = (props) => {
  const { children, isModalOpen, toggleModal } = props;

  return (
    <>
      {isModalOpen ? (
        <>
          <Backdrop close={toggleModal} />
          <div className="modal">
            <Button additionalClasses="modal__close" click={toggleModal}><i className="fa fa-times" aria-hidden="true"></i></Button>
            <div className="modal__content">
              {children}
            </div>
          </div>
        </>
      ) : (
        null
      )}
    </>
  )
}

export default Modal;
