import React, { Component } from 'react';

import Button from '../../../UI/Button/Button';

class Applications extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <>
        {isAuthenticated ? (
          <div id="applications-chart" className="applications-chart"></div>
        ) : (
          <>
            <h3>You need to be logged in to view this page!</h3>
            <Button>Log In</Button>
          </>
        )}
      </>
    )
  }
}

export default Applications;
