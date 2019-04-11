import React, { Component } from 'react';

class Home extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <>
        <h3>Job Search Companion</h3>
        {isAuthenticated ? (
          <p>Click on the items in the navigation to get started!</p>
        ) : (
          <>
            <p>Log in to get started!</p>
            <button className="login">Log In</button>
          </>
        )}
      </>
    )
  }
}

export default Home;
