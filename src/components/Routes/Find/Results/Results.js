import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Results.scss';

import SortBy from './SortBy/SortBy';
import SearchItem from '../SearchItem/SearchItem';
import Pagination from './Pagination/Pagination';

class Results extends Component {
  componentDidUpdate = (prevProps) => {
    if (this.props.search !== prevProps.search) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  render() {
    const { isAuthenticated, userIp, userAgent, search } = this.props;
    const { results, loading } = search;

    return (
      <>
        {results ? (
          <>
            {results.length > 0 ? (
              <>
                <div className="results__heading">
                  <h1>Search Results</h1>
                  <SortBy userIp={userIp} userAgent={userAgent} search={search} />
                </div>
                <div className={`results ${loading ? 'results--loading' : ''}`} style={{opacity: loading && 0.65}}>
                  {results.map((result) => {
                    return (
                      <SearchItem key={result.jobkey} item={result} isAuthenticated={isAuthenticated} />
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
                <h1 className="accessible">Search Results</h1>
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
    search: state.search
  }
}

export default connect(mapStateToProps)(Results);
