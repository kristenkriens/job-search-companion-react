import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ApplicationItem from './ApplicationItem/ApplicationItem';
import LoginRequired from '../../../UI/LoginRequired/LoginRequired';

import * as actions from '../../../../store/actions/index';

class Applications extends Component {
  componentDidMount = () => {
    if(this.props.isAuthenticated) {
      this.props.getSavedApplications(this.props.token, this.props.userId);
    }
  }

  count = 0;
  componentDidUpdate = (prevProps) => {
    let lengths = true;
    let notEqual = true;
    if(this.count > 0) {
      lengths = prevProps.savedApplications.length === 0 && this.props.savedApplications.length === 0;
      notEqual = prevProps.savedApplications === this.props.savedApplications;
    }

    if(this.props.isAuthenticated && lengths && notEqual) {
      this.props.getSavedApplications(this.props.token, this.props.userId);
    }

    this.count++;
  }

  render() {
    const { isAuthenticated, results, savedApplications, loading } = this.props;

    return (
      <>
        <h1 className="accessible">Applications</h1>
        {isAuthenticated ? (
          <>
            {savedApplications.length > 0 ? (
              <div className={`applications ${loading ? 'disable-click' : ''}`} style={{opacity: loading && 0.65}}>
                <div className="table">
                  <table className="table-inner">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Job Posting</th>
                        <th>Application Date</th>
                        <th>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                    {savedApplications.map((savedApplication) => {
                      return (
                        <ApplicationItem key={savedApplication.jobkey} item={savedApplication} />
                      )
                    })}
                    </tbody>
                  </table>
                </div>
                <div className="table__delete"><i className="fa fa-trash" aria-hidden="true"></i> Drag row here to delete</div>
              </div>
            ) : (
              <>
                {loading ? (
                  <div className="absolute-center">
                    <div className="h3">Your tracked applications are loading!</div>
                    <i className="fa fa-spinner fa-pulse fa-fw fa-2x"></i>
                  </div>
                ) : (
                  <div className="absolute-center">
                    <div className="h3">Please track some applications first!</div>
                    {results !== null ? (
                      <Link to="/find/results" className="button">Let's Go!</Link>
                    ) : (
                      <Link to="/find/search" className="button">Let's Go!</Link>
                    )}
                  </div>
                )}
              </>
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
    results: state.search.results,
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

export default connect(mapStateToProps, mapDispatchToProps)(Applications);;
