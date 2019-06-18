import React from 'react';

import './IconButton.scss';

const IconButton = (props) => {
  const { children, additionalClasses, click, disabled } = props;

  return (
    <button className={`icon ${additionalClasses ? additionalClasses : ''}`} onClick={click} disabled={disabled}>
      {children}
    </button>
  )
}

export default IconButton;
