import React from 'react';

const PaginationArrow = (props) => {
  const { currentPage, type, click } = props;

  return (
    <button className={`pagination__arrow pagination__arrow--${type}`} onClick={(event) => click(props, event, currentPage, type)}>
      {type === 'prev' ? (
        <i className="fa fa-chevron-left" aria-hidden="true"></i>
      ) : (
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      )}
    </button>
  )
}

export default PaginationArrow;
