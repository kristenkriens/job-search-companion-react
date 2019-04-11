import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class Content extends Component {
  componentDidMount() {
    this.props.handleNavGroupItemLoaded(this.props.group);
  }

  render() {
    const { component } = this.props;

    return (
      <div className="content">
        {component}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleNavGroupItemLoaded: (navGroup) => dispatch(actions.changeOpenSidenavGroup(navGroup))
  }
}

export default connect(null, mapDispatchToProps)(Content);
