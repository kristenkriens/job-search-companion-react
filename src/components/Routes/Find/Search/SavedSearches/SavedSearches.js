import React, { Component } from 'react';
import { connect } from 'react-redux';

import LinkButton from '../../../../UI/Button/LinkButton/LinkButton';
import Loading from '../../../../UI/Loading/Loading';

import { countries } from '../../../../../shared/countries';

import * as actions from '../../../../../store/actions/index';

class SavedSearches extends Component {
  useSearch = (event, searchId) => {
    event.preventDefault();

    this.props.useSavedSearch(this.props.token, this.props.userId, searchId);
  }

  removeSearch = (event, searchId) => {
    event.preventDefault();

    this.props.removeSavedSearch(this.props.token, this.props.userId, searchId);
  }

  render() {
    const { savedSearches, jobTypes, loading } = this.props;

    return (
      <>
        <div className="saved-searches">
          <div className="saved-searches__heading">
            <h3>Saved Searches</h3><Loading loading={loading} />
            {savedSearches.length >= 10 && (
              <div>(10 most recent)</div>
            )}
          </div>
          {savedSearches.length > 0 ? (
            <ul className={`saved-searches__list ${loading ? 'disable-click' : ''}`} style={{opacity: loading && 0.65}}>
              {savedSearches.map((search) => {
                return (
                  <li key={search.searchId}>
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
                    <div className="button-wrapper button-wrapper--inline button-wrapper--inline-left">
                      <LinkButton click={(event) => this.useSearch(event, search.searchId)}>Use</LinkButton>
                      <LinkButton click={(event) => this.removeSearch(event, search.searchId)}>Remove</LinkButton>
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
    token: state.auth.token,
    userId: state.auth.userId,
    loading: state.savedSearches.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    useSavedSearch: (token, userId, searchId) => dispatch(actions.useSavedSearch(token, userId, searchId)),
    removeSavedSearch: (token, userId, searchId) => dispatch(actions.removeSavedSearch(token, userId, searchId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedSearches);
