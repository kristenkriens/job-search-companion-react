import React from 'react';

import './Backdrop.scss';

const Backdrop = (props) => {
  const { close } = props;

  return (
    <div className="backdrop" onClick={close}></div>
  )
}

export default Backdrop;
