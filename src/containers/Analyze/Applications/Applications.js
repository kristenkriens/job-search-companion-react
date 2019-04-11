import React, { Component } from 'react';

class Applications extends Component {
  render() {
    return (
      <div className="content-inner content-inner--analyze-applications">
        <div className="content-inner__logged-out">
          <h3>You need to be logged in to view this page!</h3>
          <button className="login">Log In</button>
        </div>
        <div className="content-inner__logged-in">
          <div id="applications-chart" className="applications-chart"></div>
        </div>
      </div>
    )
  }
}

export default Applications;
