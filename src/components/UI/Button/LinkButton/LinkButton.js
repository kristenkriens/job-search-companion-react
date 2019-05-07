import React from 'react';

import './LinkButton.scss';

const LinkButton = (props) => {
  const { children, additionalClasses, click, disabled } = props;

  return (
    <button className={`link ${additionalClasses ? additionalClasses : ''}`} onClick={click} disabled={disabled}>
      {children}
    </button>
  )
}

export default LinkButton;
