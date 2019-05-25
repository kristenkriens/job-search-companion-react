import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import LoginRequiredMessage from '../../../UI/CenteredMessages/LoginRequiredMessage/LoginRequiredMessage';
import LoadingMessage from '../../../UI/CenteredMessages/LoadingMessage/LoadingMessage';
import ResultsChart from './ResultsChart/ResultsChart';

import * as actions from '../../../../store/actions/index';

class Results extends Component {
  componentDidMount = () => {
    if(this.props.isAuthenticated) {
      this.props.getSavedApplications(this.props.token, this.props.userId);
    }
  }

  count = 0;
  componentDidUpdate = (prevProps) => {
    let equal = false;
    if(this.count > 0) {
      equal = isEqual(prevProps.savedApplications, this.props.savedApplications);
    }

    if(this.props.isAuthenticated && !equal) {
      this.props.getSavedApplications(this.props.token, this.props.userId);
    }

    this.count++;
  }

  render() {
    const { isAuthenticated, loading, savedApplications } = this.props;

    const title = 'Results';

    const LoadingView = () => (
      <>
        <h1 className="accessible">{title}</h1>
        <LoadingMessage message="Your application results are loading!" />
      </>
    );

    const ResultsView = () => (
      <>
        <h1>{title}</h1>
        <ResultsChart savedApplications={savedApplications} />
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
          <>
            {loading ? (
              <LoadingView />
            ) : (
              <ResultsView />
            )}
          </>
        ) : (
          <NotAuthenticatedView />
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    savedApplications: state.savedApplications.savedApplications,
    loading: state.savedApplications.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedApplications: (token, userId) => dispatch(actions.getSavedApplications(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
