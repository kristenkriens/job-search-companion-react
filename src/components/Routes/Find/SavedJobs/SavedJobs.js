import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions/index';

class SavedJobs extends Component {
  remove = (event, searchId) => {
    event.preventDefault();

    this.props.removeSavedSearch(this.props.token, this.props.userId, searchId);
  }

  render() {
    const { isAuthenticated, savedJobs } = this.props;

    return (
      <>
        <div className="saved-jobs">
          <h1>Saved Jobs</h1>
          {savedJobs.length > 0 ? (
            {savedJobs.map((job) => {
              console.log(job);
            })}
          ) : (
            <p>You don't have any saved jobs.</p>
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
    savedJobs: state.savedJobs.savedJobs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeSavedJob: (token, userId, jobId) => dispatch(actions.removeSavedJob(token, userId, jobId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedJobs);
