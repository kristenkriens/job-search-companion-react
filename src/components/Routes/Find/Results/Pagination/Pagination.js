import React from 'react';

import './Pagination.scss';

import PaginationArrow from './PaginationArrow/PaginationArrow';

const Pagination = (props) => {
  const { search, searchGo, searchPaginationChange } = props;
  const { totalResults, currentPage, limit, userIp, userAgent, query, location, country, radius, jobType, age } = search;

  const totalPages = Math.floor(totalResults / limit);

  const clickSearchPaginationArrow = (event, currentPage, type) => {
    event.preventDefault();

    const start = currentPage === 0 ? currentPage * limit : (currentPage - 1) * limit;

    searchGo(userAgent, userIp, start, limit, query, location, country, radius, jobType, age);
    searchPaginationChange(start, currentPage);
  }

  const onEnter = (e) => {
    if(e.key === 'Enter'){
      console.log('enter');
    }
  }

  return (
    <div className="pagination">
      <PaginationArrow currentPage={currentPage} type="prev" click={clickSearchPaginationArrow} />
      <div className="pagination__inner">
        <input type="number" min="1" max={totalPages} value={currentPage} onKeyPress={onEnter} /> / <span>{totalPages}</span>
      </div>
      <PaginationArrow currentPage={currentPage} type="next" click={clickSearchPaginationArrow} />
    </div>
  )
}

export default Pagination;
