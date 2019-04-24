import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './Pagination.scss';

const Pagination = (props) => {
  const { totalResults, search } = props;

  return (
    <div className="pagination">
      {totalResults}
    </div>
  )
}

export default Pagination;
