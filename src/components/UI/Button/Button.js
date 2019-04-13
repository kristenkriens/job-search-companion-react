import React from 'react';

import './Button.scss';

const Button = (props) => {
  const { children, type, additionalClasses, click } = props;

  return (
    <button className={`button ${additionalClasses ? additionalClasses : ''}`} type={type} onClick={click}>
      {children}
    </button>
  )
}

export default Button;
