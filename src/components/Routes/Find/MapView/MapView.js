import React, { Component } from 'react';

class MapView extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <>
        <h3>Please fill out the search form first!</h3>
      </>
    )
  }
}

export default MapView;
