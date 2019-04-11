import React, { Component } from 'react';
import { connect } from 'react-redux';

import SidebarNav from '../../../components/Layout/SidebarNav/SidebarNav';

import * as actions from '../../../store/actions/index';

class Sidebar extends Component {
  render() {
    const { openNavGroup, handleNavGroupClick } = this.props;

    return (
      <header className="sidebar">
        <h1>Job Search Companion</h1>
        <SidebarNav openNavGroup={openNavGroup} handleNavGroupClick={handleNavGroupClick} />
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    openNavGroup: state.navigation.openNavGroup
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleNavGroupClick: (navGroup) => dispatch(actions.changeOpenSidenavGroup(navGroup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
