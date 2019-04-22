import React, { Component } from 'react';
import { connect } from 'react-redux';

class Results extends Component {
  render() {
    const { isAuthenticated, results } = this.props;

    return (
      <>
        {results ? (
          <pre>{JSON.stringify(results)}</pre>
        ) : (
          <h3>Please fill out the search form first!</h3>
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
