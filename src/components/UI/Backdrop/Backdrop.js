import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './Backdrop.scss';

const Backdrop = (props) => {
  const { isOpen, type, close } = props;

  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <div className={`backdrop backdrop--${type}`} onClick={close}></div>
    </CSSTransition>
  )
}

Backdrop.defaultProps = {
  type: "default"
};

export default Backdrop;
