import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  const { children, show, modalClosed } = props;

  return (
    <>
      <Backdrop show={show} close={modalClosed} />
      <div
        className="modal"
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0'
        }}
      >
        {children}
      </div>
    </>
  )
}

export default Modal;
