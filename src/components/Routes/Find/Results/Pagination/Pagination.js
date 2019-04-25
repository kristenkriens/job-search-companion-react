import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clickSearchPagination } from '../../../../../shared/forms';
import * as actions from '../../../../../store/actions/index';

import './Pagination.scss';

class Pagination extends Component {
  render() {
    const { totalResults } = this.props;

    const totalPages = Math.floor(totalResults / 10);
    const totalPagesArray = new Array(totalPages - 1).fill().map((v,i)=>i);

    console.log(totalPagesArray);

    return (
      <div className="pagination">
        {totalPagesArray.map((pageNumber) => {
          return (
            <button className="pagination__item" onClick={(event) => clickSearchPagination(this, event, pageNumber)}>{pageNumber + 1}</button>
          )
        })}
        ...
        <button className="pagination__item" onClick={(event) => clickSearchPagination(this, event, totalPages)}>{totalPages}</button>
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
    country: state.search.country
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchGo: (userAgent, userIp, start, query, location, country, radius, jobType, age) => dispatch(actions.searchGo(userAgent, userIp, start, query, location, country, radius, jobType, age))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
