import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="content-inner content-inner--home">
        <h3>Job Search Companion</h3>
        <div className="content-inner__logged-in">
          <p>Click on the items in the navigation to get started!</p>
        </div>
        <div className="content-inner__logged-out">
          <p>Log in to get started!</p>
          <button className="login">Log In</button>
        </div>
      </div>
    )
  }
}

export default Home;
