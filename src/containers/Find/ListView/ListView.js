import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class ListView extends Component {
  componentDidMount() {
    this.props.handleNavGroupItemLoaded('find');
  }

  render() {
    return (
      <div className="content-inner content-inner--list">
        <h3>Please fill out the search form first!</h3>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleNavGroupItemLoaded: (navGroup) => dispatch(actions.changeOpenSidenavGroup(navGroup))
  }
}

export default connect(null, mapDispatchToProps)(ListView);
