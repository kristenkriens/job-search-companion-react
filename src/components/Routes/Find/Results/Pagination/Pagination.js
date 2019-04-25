import React, { Component } from 'react';

import './Pagination.scss';

import PaginationArrow from './PaginationArrow/PaginationArrow';

class Pagination extends Component {
  state = {
    inputValue: this.props.search.currentPage
  }

  clickSearchPaginationArrow = (event, type) => {
    event.preventDefault();

    const { currentPage, limit, query, location, country, radius, jobType, age } = this.props.search;

    let newCurrentPage = null;
    if(type === 'prev') {
      newCurrentPage = currentPage - 1;
    } else {
      newCurrentPage = currentPage + 1;
    }

    this.changeInputValue(newCurrentPage);
    this.props.searchPaginationChange(limit, newCurrentPage, this.props.userIp, this.props.userAgent, query, location, country, radius, jobType, age);
  }

  changeInputValue = (value) => {
    this.setState({
      inputValue: Number(value) === 0 ? '' : Number(value)
    });
  }

  pressEnter = (event, newCurrentPage) => {
    if(event.key === 'Enter') {
      const { limit, query, location, country, radius, jobType, age } = this.props.search;

      if(newCurrentPage === '') {
        newCurrentPage = this.props.search.currentPage;

        this.changeInputValue(newCurrentPage);
      }

      this.props.searchPaginationChange(limit, newCurrentPage, this.props.userIp, this.props.userAgent, query, location, country, radius, jobType, age);
    }
  }

  render() {
    const { search } = this.props;
    const { totalResults, limit, currentPage } = search;

    const totalPages = Math.floor(totalResults / limit);

    return (
      <div className="pagination">
        <PaginationArrow type="prev" disabled={currentPage === 1} click={(event) => this.clickSearchPaginationArrow(event, 'prev')} />
        <div className="pagination__inner">
          <input type="number" min="1" max={totalPages} value={this.state.inputValue} onChange={(event) => this.changeInputValue(event.target.value)} onKeyPress={(event) => this.pressEnter(event, this.state.inputValue)} /> / <span>{totalPages}</span>
        </div>
        <PaginationArrow type="next" disabled={currentPage === totalResults} click={(event) => this.clickSearchPaginationArrow(event, 'next')} />
      </div>
    )
  }
}

export default Pagination;
