import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import LoginRequired from '../../../UI/LoginRequired/LoginRequired';
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

    return (
      <>
        {isAuthenticated ? (
          <>
            {loading ? (
              <>
                <h1 className="accessible">Results</h1>
                <div className="absolute-center">
                  <div className="h3">Your application results are loading!</div>
                  <i className="fa fa-spinner fa-pulse fa-fw fa-2x"></i>
                </div>
              </>
            ) : (
              <>
                <h1>Results</h1>
                <ResultsChart savedApplications={savedApplications} />
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="accessible">Results</h1>
            <LoginRequired />
          </>
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
