import React from 'react';

import './Pagination.scss';

import PaginationArrow from './PaginationArrow/PaginationArrow';

const Pagination = (props) => {
  const { search, searchPaginationChange } = props;
  const { totalResults, currentPage, limit, userIp, userAgent, query, location, country, radius, jobType, age } = search;

  const totalPages = Math.floor(totalResults / limit);

  const clickSearchPaginationArrow = (event, type) => {
    event.preventDefault();

    console.log('currentPage', currentPage);

    const start = currentPage === 0 ? currentPage * limit : (currentPage - 1) * limit;

    searchPaginationChange(start, limit, currentPage, userIp, userAgent, query, location, country, radius, jobType, age);
  }

  const pressEnter = (event) => {
    if(event.key === 'Enter') {
      console.log('enter');
    }
  }

  return (
    <div className="pagination">
      <PaginationArrow type="prev" click={(event) => clickSearchPaginationArrow(event, 'prev')} />
      <div className="pagination__inner">
        <input type="number" min="1" max={totalPages} value={currentPage} onKeyPress={pressEnter} /> / <span>{totalPages}</span>
      </div>
      <PaginationArrow type="next" click={(event) => clickSearchPaginationArrow(event, 'next')} />
    </div>
  )
}

export default Pagination;
