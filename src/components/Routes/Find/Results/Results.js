import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Results.scss';

import ResultItem from './ResultItem/ResultItem';
import Pagination from './Pagination/Pagination';

class Results extends Component {
  render() {
    const { isAuthenticated, results, loading } = this.props;

    return (
      <>
        {results ? (
          <>
            {results.length > 0 ? (
              <>
                <h1>Search Results</h1>
                <div className={`results ${loading ? 'results--loading' : ''}`}>
                  {results.map((result) => {
                    return (
                      <ResultItem key={result.jobkey} result={result} />
                    )
                  })}
                </div>
                <Pagination loading={loading} />
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
    results: state.search.results,
    loading: state.search.loading
  }
}

export default connect(mapStateToProps)(Results);
