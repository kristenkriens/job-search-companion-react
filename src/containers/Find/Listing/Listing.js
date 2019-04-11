import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class Listing extends Component {
  componentDidMount() {
    this.props.handleNavGroupItemLoaded('find');
  }

  render() {
    return (
      <div className="content-inner content-inner--listing"></div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleNavGroupItemLoaded: (navGroup) => dispatch(actions.changeOpenSidenavGroup(navGroup))
  }
}

export default connect(null, mapDispatchToProps)(Listing);
