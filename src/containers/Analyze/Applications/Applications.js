import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class Applications extends Component {
  componentDidMount() {
    this.props.handleNavGroupItemLoaded('analyze');
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    handleNavGroupItemLoaded: (navGroup) => dispatch(actions.changeOpenSidenavGroup(navGroup))
  }
}

export default connect(null, mapDispatchToProps)(Applications);
