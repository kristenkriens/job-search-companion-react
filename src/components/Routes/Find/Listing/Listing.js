import React, { Component } from 'react';

class Listing extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="absolute-center">
        <h1>Listing</h1>
      </div>
    )
  }
}

export default Listing;
