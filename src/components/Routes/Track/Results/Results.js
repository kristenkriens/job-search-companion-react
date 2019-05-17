import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginRequired from '../../../UI/LoginRequired/LoginRequired';
import ResultsChart from './ResultsChart/ResultsChart';

class Results extends Component {
  render() {
    const { isAuthenticated, loading, savedApplications } = this.props;

    return (
      <>
        {isAuthenticated ? (
          <>
            <h1>Results</h1>
            {loading ? (
              <div className="absolute-center">
                <div className="h3">Your application results are loading!</div>
                <i className="fa fa-spinner fa-pulse fa-fw fa-2x"></i>
              </div>
            ) : (
              <ResultsChart savedApplications={savedApplications} />
            )}
          </>
        ) : (
          <LoginRequired />
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    savedApplications: state.savedApplications.savedApplications,
    loading: state.savedApplications.loading
  }
}

export default connect(mapStateToProps)(Results);
