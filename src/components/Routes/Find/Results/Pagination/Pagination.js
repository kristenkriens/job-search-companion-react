import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Pagination.scss';

import PaginationArrow from './PaginationArrow/PaginationArrow';

import * as actions from '../../../../../store/actions/index';

class Pagination extends Component {
  state = {
    inputValue: this.props.search.currentPage
  }

  totalPages = Math.ceil(this.props.search.totalResults / this.props.search.limit);

  clickSearchPaginationArrow = (event, type) => {
    event.preventDefault();

    const { userIp, userAgent, search } = this.props;

    let newCurrentPage = null;
    if(type === 'prev') {
      newCurrentPage = search.currentPage - 1;
    } else {
      newCurrentPage = search.currentPage + 1;
    }

    this.changeInputValue(newCurrentPage);
    this.props.searchPaginationChange({
      userIp,
      userAgent,
      currentPage: newCurrentPage,
      ...search
   });
  }

  changeInputValue = (value) => {
    this.setState({
      inputValue: Number(value) === 0 ? '' : Number(value)
    });
  }

  pressEnter = (event, newCurrentPage) => {
    if(event.key === 'Enter') {
      const { userIp, userAgent, search } = this.props;
      const { limit, sortBy, currentPage, query, location, country, radius, jobType, age } = search;

      if(newCurrentPage === '') {
        newCurrentPage = currentPage;
      } else if(newCurrentPage < 0) {
        newCurrentPage = 1;
      } else if(newCurrentPage > this.totalPages) {
        newCurrentPage = this.totalPages;
      }

      this.changeInputValue(newCurrentPage);
      this.props.searchPaginationChange({
        userIp,
        userAgent,
        limit,
        sortBy,
        currentPage: newCurrentPage,
        query,
        location,
        country,
        radius,
        jobType,
        age
     });
    }
  }

  render() {
    const { currentPage, loading } = this.props.search;

    return (
      <div className="pagination">
        <PaginationArrow type="prev" disabled={currentPage === 1} click={(event) => this.clickSearchPaginationArrow(event, 'prev')} />
        <div className="pagination__inner">
          <input type="number" value={this.state.inputValue} disabled={loading} onChange={(event) => this.changeInputValue(event.target.value)} onKeyPress={(event) => this.pressEnter(event, this.state.inputValue)} /> / <span>{this.totalPages}</span>
        </div>
        <PaginationArrow type="next" disabled={currentPage === this.totalPages} click={(event) => this.clickSearchPaginationArrow(event, 'next')} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchPaginationChange: (searchCriteria) => {
      dispatch(actions.searchPaginationChange(searchCriteria))
    }
  }
}

export default connect(null, mapDispatchToProps)(Pagination);
