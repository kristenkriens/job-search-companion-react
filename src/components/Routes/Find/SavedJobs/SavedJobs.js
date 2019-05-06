import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LoginRequired from '../../../UI/LoginRequired/LoginRequired';
import SearchItem from '../SearchItem/SearchItem';

import * as actions from '../../../../store/actions/index';

class SavedJobs extends Component {
  remove = (event, jobId) => {
    event.preventDefault();

    this.props.removeSavedJob(this.props.token, this.props.userId, jobId);
  }

  render() {
    const { isAuthenticated, savedJobs } = this.props;

    return (
      <>
        {isAuthenticated ? (
          <div className="saved-jobs">
            {savedJobs.length > 0 ? (
              <>
                <h1>Saved Jobs</h1>
                {savedJobs.map((savedJob) => {
                  console.log(savedJob);

                  return (
                    <SearchItem key={savedJob.jobkey} item={savedJob} type="saved" isAuthenticated />
                  )
                })}
              </>
            ) : (
              <div className="absolute-center">
                <h1 className="accessible">Saved Jobs</h1>
                <div className="h3">Please save some jobs first!</div>
                <Link to="/find/search" className="button">Let's Go!</Link>
              </div>
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
    token: state.auth.token,
    userId: state.auth.userId,
    savedJobs: state.savedJobs.savedJobs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeSavedJob: (token, userId, jobId) => dispatch(actions.removeSavedJob(token, userId, jobId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedJobs);
