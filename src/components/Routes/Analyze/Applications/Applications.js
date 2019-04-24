import React, { Component } from 'react';

import Button from '../../../UI/Button/Button';

class Applications extends Component {
  render() {
    const { isAuthenticated, toggleAndSetActiveModal } = this.props;

    return (
      <>
        <h1 className="accessible">Analyze Applications</h1>
        {isAuthenticated ? (
          <div id="applications-chart" className="applications-chart"></div>
        ) : (
          <>
            <div className="h3">You need to be logged in to view this page!</div>
            <Button click={() => toggleAndSetActiveModal('login')}>Log In</Button>
          </>
        )}
      </>
    )
  }
}

export default Applications;
