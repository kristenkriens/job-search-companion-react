import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './SavedJobs.scss';

import LoginRequired from '../../../UI/LoginRequired/LoginRequired';
import SearchItem from '../SearchItem/SearchItem';

import * as actions from '../../../../store/actions/index';

class SavedJobs extends Component {
  componentDidMount = () => {
    if(this.props.isAuthenticated) {
      this.props.getSavedJobs(this.props.token, this.props.userId);
    }
  }

  count = 0;
  componentDidUpdate = (prevProps) => {
    let lengths = true;
    let notEqual = true;
    if(this.count > 0) {
      lengths = prevProps.savedJobs.length === 0 && this.props.savedJobs.length === 0;
      notEqual = prevProps.savedJobs === this.props.savedJobs;
    }

    if(this.props.isAuthenticated && lengths && notEqual) {
      this.props.getSavedJobs(this.props.token, this.props.userId);
    }

    this.count++;
  }

  render() {
    const { isAuthenticated, results, savedJobs, loading, savedApplicationsLoading } = this.props;

    const isLoading = loading || savedApplicationsLoading;

    return (
      <>
        {isAuthenticated ? (
          <div className="saved-jobs">
            {savedJobs.length > 0 ? (
              <>
                <h1>Saved Jobs</h1>
                <div className={`saved-jobs__items ${isLoading && 'disable-click'}`} style={{opacity: isLoading && 0.65}}>
                  {savedJobs.map((savedJob) => {
                    return (
                      <SearchItem key={savedJob.jobkey} item={savedJob} type="saved" isAuthenticated />
                    )
                  })}
                </div>
              </>
            ) : (
              <>
                {loading ? (
                  <div className="absolute-center">
                    <h1 className="accessible">Saved Jobs</h1>
                    <div className="h3">Your saved jobs are loading!</div>
                    <i className="fa fa-spinner fa-pulse fa-fw fa-2x"></i>
                  </div>
                ) : (
                  <div className="absolute-center">
                    <h1 className="accessible">Saved Jobs</h1>
                    <div className="h3">Please save some jobs first!</div>
                    {results !== null ? (
                      <Link to="/find/results" className="button">Let's Go!</Link>
                    ) : (
                      <Link to="/find/search" className="button">Let's Go!</Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <LoginRequired />
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.search.results,
    token: state.auth.token,
    userId: state.auth.userId,
    savedJobs: state.savedJobs.savedJobs,
    loading: state.savedJobs.loading,
    savedApplicationsLoading: state.savedApplications.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedJobs: (token, userId) => dispatch(actions.getSavedJobs(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedJobs);
