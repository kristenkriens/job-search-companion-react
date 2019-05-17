import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import './SavedJobs.scss';

import LoginRequired from '../../../UI/LoginRequired/LoginRequired';
import SearchItem from '../SearchItem/SearchItem';

import * as actions from '../../../../store/actions/index';

class SavedJobs extends Component {
  componentDidMount = () => {
    if(this.props.isAuthenticated) {
      this.props.getSavedJobs(this.props.token, this.props.userId);
      this.props.getSavedApplications(this.props.token, this.props.userId);
    }
  }

  count = 0;
  componentDidUpdate = (prevProps) => {
    let jobsEqual = false;
    let applicationsEqual = false;
    if(this.count > 0) {
      jobsEqual = isEqual(prevProps.savedJobs, this.props.savedJobs);
      applicationsEqual = isEqual(prevProps.savedApplications, this.props.savedApplications);
    }

    if(this.props.isAuthenticated) {
      if(!jobsEqual) {
        this.props.getSavedJobs(this.props.token, this.props.userId);
      }

      if(!applicationsEqual) {
        this.props.getSavedApplications(this.props.token, this.props.userId);
      }
    }

    this.count++;
  }

  render() {
    const { isAuthenticated, results, loading, savedJobs, savedApplications, savedApplicationsLoading } = this.props;

    const isLoading = loading || savedApplicationsLoading;

    return (
      <>
        {isAuthenticated ? (
          <div className="saved-jobs">
            {savedJobs.length > 0 ? (
              <>
                <h1>Saved Jobs</h1>
                <div className={`saved-jobs__items ${isLoading ? 'disable-click' : ''}`} style={{opacity: isLoading && 0.65}}>
                  {savedJobs.map((savedJob) => {
                    let trackedArray = savedApplications.map((savedApplication) => {
                      return (
                        savedApplication['jobkey'] === savedJob.jobkey
                      )
                    });
                    const tracked = trackedArray.includes(true);

                    return (
                      <SearchItem key={savedJob.jobkey} item={savedJob} type="saved" tracked={tracked} isAuthenticated />
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
    loading: state.savedJobs.loading,
    savedJobs: state.savedJobs.savedJobs,
    savedApplications: state.savedApplications.savedApplications,
    savedApplicationsLoading: state.savedApplications.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedJobs: (token, userId) => dispatch(actions.getSavedJobs(token, userId)),
    getSavedApplications: (token, userId) => dispatch(actions.getSavedApplications(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedJobs);
