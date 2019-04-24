import React, { Component } from 'react';

import LoginRequired from '../../../UI/LoginRequired/LoginRequired';

class Applications extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <>
        <h1 className="accessible">Analyze Applications</h1>
        {isAuthenticated ? (
          <div id="applications-chart" className="applications-chart"></div>
        ) : (
          <LoginRequired />
        )}
      </>
    )
  }
}

export default Applications;
