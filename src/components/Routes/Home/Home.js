import React, { Component } from 'react';

import Button from '../../UI/Button/Button';

class Home extends Component {
  render() {
    const { isAuthenticated, toggleAndSetActiveModal } = this.props;

    return (
      <>
        <h1 className="accessible">Home</h1>
        {isAuthenticated ? (
          <div className="h3">Click on the items in the navigation to get started!</div>
        ) : (
          <>
            <div className="h3">Log in or click on the items in the navigation to get started!</div>
            <Button click={() => toggleAndSetActiveModal('login')}>Log In</Button>
          </>
        )}
      </>
    )
  }
}

export default Home;
