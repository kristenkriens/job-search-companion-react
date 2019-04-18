import React from 'react';

import './Button.scss';

const Button = (props) => {
  const { children, type, loading, additionalClasses, disabled, click } = props;

  return (
    <button className={`button ${additionalClasses ? additionalClasses : ''}`} type={type} disabled={disabled} onClick={click}>
      {children}
      {loading && (
        <>
          <i class="fa fa-spinner fa-pulse fa-fw"></i>
          <span class="accessible">Loading...</span>
        </>
      )}
    </button>
  )
}

export default Button;
