import React from 'react';

import './Button.scss';

import Loading from '../Loading/Loading';

const Button = (props) => {
  const { children, type, loading, additionalClasses, disabled, click } = props;

  return (
    <button className={`button ${additionalClasses ? additionalClasses : ''}`} type={type} disabled={disabled} onClick={click}>
      <span>
        {children}
      </span>
      <Loading loading={loading} />
    </button>
  )
}

export default Button;
