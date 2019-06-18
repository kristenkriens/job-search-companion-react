import React, { Component } from 'react';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';

import './SavedJobs.scss';

import LoginRequiredMessage from '../../../UI/CenteredMessages/LoginRequiredMessage/LoginRequiredMessage';
import LoadingMessage from '../../../UI/CenteredMessages/LoadingMessage/LoadingMessage';
import ButtonMessage from '../../../UI/CenteredMessages/ButtonMessage/ButtonMessage';
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
      jobsEqual = _isEqual(prevProps.savedJobs, this.props.savedJobs);
      applicationsEqual = _isEqual(prevProps.savedApplications, this.props.savedApplications);
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

    const title = 'Saved Jobs';

    const SavedJobsView = () => (
      <>
        <h1>{title}</h1>
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
    );

    const LoadingView = () => (
      <>
        <h1 className="accessible">{title}</h1>
        <LoadingMessage message="Your saved jobs are loading!" />
      </>
    );

    const NoSavedJobsView = () => (
      <>
        <h1 className="accessible">{title}</h1>
        <ButtonMessage message="Please save some jobs first!" buttonLink={results !== null ? '/find/results' : '/find/search'} buttonText="Let's Go!" />
      </>
    );

    const NotAuthenticatedView = () => (
      <>
        <h1 className="accessible">{title}</h1>
        <LoginRequiredMessage />
      </>
    );

    return (
      <>
        {isAuthenticated ? (
          <div className="saved-jobs">
            {savedJobs.length > 0 ? (
              <SavedJobsView />
            ) : (
              <>
                {loading ? (
                  <LoadingView />
                ) : (
                  <NoSavedJobsView />
                )}
              </>
            )}
          </div>
        ) : (
          <NotAuthenticatedView />
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
