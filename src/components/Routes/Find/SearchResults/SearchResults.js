import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './SearchResults.scss';

import SortBy from './SortBy/SortBy';
import SearchItem from '../SearchItem/SearchItem';
import Pagination from './Pagination/Pagination';

import * as actions from '../../../../store/actions/index';

class SearchResults extends Component {
  componentDidMount = () => {
    if(this.props.isAuthenticated) {
      this.props.getSavedJobs(this.props.token, this.props.userId);
      this.props.getSavedApplications(this.props.token, this.props.userId);
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.search !== prevProps.search) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  render() {
    const { isAuthenticated, userIp, userAgent, search, savedJobs, savedApplications, savedJobsLoading, savedApplicationsLoading } = this.props;
    const { results, loading } = search;

    const isLoading = loading || savedJobsLoading || savedApplicationsLoading;

    return (
      <>
        {results ? (
          <>
            {results.length > 0 ? (
              <>
                <div className="search-results__heading">
                  <h1>Search Results</h1>
                  <SortBy userIp={userIp} userAgent={userAgent} search={search} />
                </div>
                <div className={`search-results ${isLoading ? 'disable-click' : ''}`} style={{opacity: isLoading && 0.65}}>
                  {results.map((result) => {
                    let savedArray = savedJobs.map((savedJob) => {
                      return (
                        savedJob['jobkey'] === result.jobkey
                      )
                    });
                    const saved = savedArray.includes(true);

                    let trackedArray = savedApplications.map((savedApplication) => {
                      return (
                        savedApplication['jobkey'] === result.jobkey
                      )
                    });
                    const tracked = trackedArray.includes(true);

                    return (
                      <SearchItem key={result.jobkey} item={result} type="result" saved={saved} tracked={tracked} isAuthenticated={isAuthenticated} />
                    )
                  })}
                </div>
                <Pagination userIp={userIp} userAgent={userAgent} search={search} />
                <div className="indeed-attribution">
                  <span id="indeed_at"><a href="http://www.indeed.com/" rel="nofollow noopener noreferrer" target="_blank">jobs</a> by <a href="http://www.indeed.com/" rel="nofollow noopener noreferrer" target="_blank" title="Job Search"><img src="http://www.indeed.com/p/jobsearch.gif" style={{border: 0, verticalAlign: 'middle'}} alt="Indeed job search" /></a></span>
                </div>
              </>
            ) : (
              <div className="absolute-center">
                <h1 className="accessible">Search SearchResults</h1>
                <div className="h3">Sorry, your search returned <span className="red">0</span> results. Please try again!</div>
                <Link to="/find/search" className="button">Try Again</Link>
              </div>
            )}
          </>
        ) : (
          <div className="absolute-center">
            <div className="h3">Please fill out the search form first!</div>
            <Link to="/find/search" className="button">Let's Go!</Link>
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    search: state.search,
    savedJobs: state.savedJobs.savedJobs,
    savedApplications: state.savedApplications.savedApplications,
    savedJobsLoading: state.savedJobs.loading,
    savedApplicationsLoading: state.savedApplications.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedJobs: (token, userId) => dispatch(actions.getSavedJobs(token, userId)),
    getSavedApplications: (token, userId) => dispatch(actions.getSavedApplications(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);