import React, { Component } from 'react';
import { connect } from 'react-redux';

import Result from './Result/Result';

class Results extends Component {
  render() {
    const { isAuthenticated, results } = this.props;

    return (
      <>
        {results ? (
          <>
            <h1>Search Results</h1>
            {results.length > 0 ? (
              <>
                {results.map((result) => {
                  return (
                    <Result key={result.jobkey} result={result} />
                  )
                })}
              </>
            ) : (
              <>
                <p className="center">Sorry, your search returned 0 results. Please try again!</p>
              </>
            )}
            {results.map((result) => {
              return (
                <Result key={result.jobkey} result={result} />
              )
            })}
            <div className="indeed-attribution">
              <span id="indeed_at"><a href="http://www.indeed.com/" rell="nofollow" target="_blank">jobs</a> by <a href="http://www.indeed.com/" rell="nofollow" title="Job Search"><img src="http://www.indeed.com/p/jobsearch.gif" style={{border: 0, verticalAlign: 'middle'}} alt="Indeed job search" /></a></span>
            </div>
          </>
        ) : (
          <div className="h3">Please fill out the search form first!</div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.search.results
  }
}

export default connect(mapStateToProps)(Results);
