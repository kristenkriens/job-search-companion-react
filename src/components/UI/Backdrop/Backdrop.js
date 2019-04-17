import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './Backdrop.scss';

const Backdrop = (props) => {
  const { isOpen, close } = props;

  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <div className="backdrop" onClick={close}></div>
    </CSSTransition>
  )
}

export default Backdrop;
