import React from 'react';

import Button from '../../../../../UI/Button/Button';

const PaginationArrow = (props) => {
  const { type, disabled, click } = props;

  return (
    <Button additionalClasses={`pagination__arrow pagination__arrow--${type}`} disabled={disabled} click={click}>
      {type === 'prev' ? (
        <i className="fa fa-chevron-left" aria-hidden="true"></i>
      ) : (
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      )}
    </Button>
  )
}

export default PaginationArrow;
