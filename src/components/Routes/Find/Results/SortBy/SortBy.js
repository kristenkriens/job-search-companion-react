import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SortBy.scss';

import * as actions from '../../../../../store/actions/index';

class SortBy extends Component {
  state = {
    selectValue: this.props.search.sortBy
  }

  changeSelectValue = (value) => {
    const { limit, start, query, location, country, radius, jobType, age } = this.props.search;

    this.setState({
      selectValue: value
    });

    this.props.searchSortByChange(this.props.userIp, this.props.userAgent, limit, value, start, query, location, country, radius, jobType, age);
  }

  render() {
    return (
      <div className="sort-by">
        <div className="form__element form__element--inline-label">
          <label htmlFor="sortBy">Sort By:</label>
          <div className="form__element-inner form__element-inner--select">
            <select id="sortBy" value={this.state.selectValue} onChange={(event) => this.changeSelectValue(event.target.value)}>
              <option value="relevance">
                Relevance
              </option>
              <option value="date">
                Date
              </option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchSortByChange: (userIp, userAgent, limit, sortBy, start, query, location, country, radius, jobType, age) => {
      dispatch(actions.searchSortByChange(userIp, userAgent, limit, sortBy, start, query, location, country, radius, jobType, age))
    }
  }
}

export default connect(null, mapDispatchToProps)(SortBy);
