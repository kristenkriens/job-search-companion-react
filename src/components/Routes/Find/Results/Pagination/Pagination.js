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

    const { limit, sortBy, currentPage, query, location, country, radius, jobType, age } = this.props.search;

    let newCurrentPage = null;
    if(type === 'prev') {
      newCurrentPage = currentPage - 1;
    } else {
      newCurrentPage = currentPage + 1;
    }

    this.changeInputValue(newCurrentPage);
    this.props.searchPaginationChange(this.props.userIp, this.props.userAgent, limit, sortBy, newCurrentPage, query, location, country, radius, jobType, age);
  }

  changeInputValue = (value) => {
    this.setState({
      inputValue: Number(value) === 0 ? '' : Number(value)
    });
  }

  pressEnter = (event, newCurrentPage) => {
    if(event.key === 'Enter') {
      const { limit, sortBy, currentPage, query, location, country, radius, jobType, age } = this.props.search;

      if(newCurrentPage === '') {
        newCurrentPage = currentPage;
      } else if(newCurrentPage < 0) {
        newCurrentPage = 1;
      } else if(newCurrentPage > this.totalPages) {
        newCurrentPage = this.totalPages;
      }

      this.changeInputValue(newCurrentPage);
      this.props.searchPaginationChange(this.props.userIp, this.props.userAgent, limit, sortBy, newCurrentPage, query, location, country, radius, jobType, age);
    }
  }

  render() {
    const { search } = this.props;
    const { currentPage, loading } = search;

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
    searchPaginationChange: (userIp, userAgent, limit, sortBy, currentPage, query, location, country, radius, jobType, age) => {
      dispatch(actions.searchPaginationChange(userIp, userAgent, limit, sortBy, currentPage, query, location, country, radius, jobType, age))
    }
  }
}

export default connect(null, mapDispatchToProps)(Pagination);
