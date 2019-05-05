import React, { Component } from 'react';
import { connect } from 'react-redux';

import LinkButton from '../../../../UI/Button/LinkButton/LinkButton';

import { countries } from '../../../../../shared/countries';

import * as actions from '../../../../../store/actions/index';

class SavedSearches extends Component {
  use = (event, id) => {
    event.preventDefault();

    this.props.useSavedSearch(this.props.token, id);
  }

  remove = (event, id) => {
    event.preventDefault();

    this.props.removeSavedSearch(this.props.token, id);
  }

  render() {
    const { savedSearches, jobTypes } = this.props;

    return (
      <>
        <div className="saved-searches">
          <h3>Saved Searches</h3>
          {savedSearches.length > 0 ? (
            <ul className="saved-searches__list">
              {savedSearches.map((search) => {
                return (
                  <li key={search.id}>
                    {search.query && (
                      <span>{search.query}</span>
                    )}
                    {search.location && (
                      <span>{search.location}</span>
                    )}
                    {search.country && (
                      countries.map((country) => {
                        if(country.value === search.country) {
                          return (
                            <span key={country.value}>{country.displayValue}</span>
                          )
                        } else {
                          return false;
                        }
                      })
                    )}
                    {search.age && (
                      <span>{search.age} days</span>
                    )}
                    {search.radius && (
                      <span>{search.radius} {search.country !== 'us' ? 'km' : 'mi'}</span>
                    )}
                    {search.jobType && search.jobType !== 'nopreference' && (
                      jobTypes.map((jobType) => {
                        if(jobType.value === search.jobType) {
                          return (
                            <span key={jobType.value}>{jobType.label}</span>
                          )
                        } else {
                          return false;
                        }
                      })
                    )}
                    <div className="button-wrapper button-wrapper--inline">
                      <LinkButton click={(event) => this.use(event, search.id)}>Use</LinkButton>
                      <LinkButton click={(event) => this.remove(event, search.id)}>Remove</LinkButton>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>You don't have any saved searches.</p>
          )}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    useSavedSearch: (token, id) => dispatch(actions.useSavedSearch(token, id)),
    removeSavedSearch: (token, id) => dispatch(actions.removeSavedSearch(token, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedSearches);
