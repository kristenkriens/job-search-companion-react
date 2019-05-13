import React, { Component } from 'react';

import LoginRequired from '../../../UI/LoginRequired/LoginRequired';

class Results extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <>
        {isAuthenticated ? (
          <>
            <h1>Results</h1>
          </>
        ) : (
          <LoginRequired />
        )}
      </>
    )
  }
}

export default Results;
