import React from 'react';

import './Button.scss';

const Button = (props) => {
  const { children, type, additionalClasses, disabled, click } = props;

  return (
    <button className={`button ${additionalClasses ? additionalClasses : null}`} type={type} disabled={disabled} onClick={click}>
      {children}
    </button>
  )
}

export default Button;
