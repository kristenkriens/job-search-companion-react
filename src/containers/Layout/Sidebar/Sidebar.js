import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import SidebarNav from '../../../components/Layout/SidebarNav/SidebarNav';

import * as actions from '../../../store/actions/index';

class Sidebar extends Component {
  render() {
    const { openNavGroup, handleNavGroupClick } = this.props;

    return (
      <header className="sidebar">
        <NavLink to='/' exact>
          <h1>Job Search Companion</h1>
        </NavLink>
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
