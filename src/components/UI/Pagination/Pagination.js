import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './Pagination.scss';

const Pagination = (props) => {
  const { totalResults } = props;

  const totalPages = Math.floor(totalResults / 10);

  return (
    <div className="pagination">
    <button className="pagination__item"></button>
      {totalPages} Pages
    </div>
  )
}

export default Pagination;
