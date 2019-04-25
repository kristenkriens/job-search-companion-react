import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { clickSearchPagination } from '../../../../../shared/forms';
import * as actions from '../../../../../store/actions/index';

import './Pagination.scss';

class Pagination extends Component {
  render() {
    const { totalResults, limit, currentPage } = this.props;

    const totalPages = Math.floor(totalResults / limit);
    const totalPagesArray = new Array(totalPages).fill().map((page,i) => {
      return i;
    }).filter((page) => {
      return page !== 0;
    });

    const paginationItem = (item) => {
      return item === currentPage ? (
        <div className="pagination__item pagination__item--current"><span className="accessible">Current: </span>{item}</div>
      ) : (
        <button className="pagination__item" onClick={(event) => clickSearchPagination(this, event, item)}>{item}</button>
      )
    };

    return (
      <div className="pagination">
        {totalPagesArray.map((page) => {
          return (
            <Fragment key={page}>
              {paginationItem(page)}
            </Fragment>
          )
        })}
        <div className="pagination__item">...</div>
        {paginationItem(totalPages)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    totalResults: state.search.totalResults,
    userIp: state.user.userIp,
    userAgent: state.user.userAgent,
    location: state.search.location,
    query: state.search.query,
    age: state.search.age,
    radius: state.search.radius,
    jobType: state.search.jobType,
    country: state.search.country,
    start: state.search.start,
    currentPage: state.search.currentPage,
    limit: state.search.limit
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchGo: (userAgent, userIp, start, limit, query, location, country, radius, jobType, age) => dispatch(actions.searchGo(userAgent, userIp, start, limit, query, location, country, radius, jobType, age)),
    searchPaginationChange: (start, currentPage) => {
      dispatch(actions.searchPaginationChange(start, currentPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
