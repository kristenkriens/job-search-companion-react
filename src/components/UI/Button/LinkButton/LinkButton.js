import React from 'react';

import './LinkButton.scss';

const LinkButton = (props) => {
  const { children, additionalClasses, click } = props;

  return (
    <button className={`link ${additionalClasses ? additionalClasses : ''}`} onClick={click}>
      {children}
    </button>
  )
}

export default LinkButton;
