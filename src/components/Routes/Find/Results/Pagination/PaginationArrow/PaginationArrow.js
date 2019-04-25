import React from 'react';

const PaginationArrow = (props) => {
  const { type, click } = props;

  return (
    <button className={`pagination__arrow pagination__arrow--${type}`} onClick={click}>
      {type === 'prev' ? (
        <i className="fa fa-chevron-left" aria-hidden="true"></i>
      ) : (
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      )}
    </button>
  )
}

export default PaginationArrow;
