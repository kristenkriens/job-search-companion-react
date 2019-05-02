import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SortBy.scss';

import * as actions from '../../../../../store/actions/index';

class SortBy extends Component {
  state = {
    selectValue: this.props.search.sortBy
  }

  changeSelectValue = (value) => {
    const { userIp, userAgent, search } = this.props;

    this.setState({
      selectValue: value
    });

    const searchCriteria = {
      userIp,
      userAgent,
      ...search
    };
    searchCriteria.sortBy = value;

    this.props.searchSortByChange(searchCriteria);
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
    searchSortByChange: (searchCriteria) => dispatch(actions.searchSortByChange(searchCriteria))
  }
}

export default connect(null, mapDispatchToProps)(SortBy);
