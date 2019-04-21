import React, { Component } from 'react';

import Button from '../../UI/Button/Button';

class Home extends Component {
  render() {
    const { isAuthenticated, toggleAndSetActiveModal } = this.props;

    return (
      <>
        <h3>Job Search Companion</h3>
        {isAuthenticated ? (
          <p>Click on the items in the navigation to get started!</p>
        ) : (
          <>
            <p>Log in or click on the items in the navigation to get started!</p>
            <Button click={() => toggleAndSetActiveModal('login')}>Log In</Button>
          </>
        )}
      </>
    )
  }
}

export default Home;
