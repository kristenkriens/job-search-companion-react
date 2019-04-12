import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import SidebarNav from './SidebarNav/SidebarNav';

import * as actions from '../../../store/actions/index';

class Sidebar extends Component {
  render() {
    const { openNavGroup, handleNavClick } = this.props;

    return (
      <header className="sidebar">
        <NavLink to='/' exact onClick={() => handleNavClick('')}>
          <h1>Job Search Companion</h1>
        </NavLink>
        <SidebarNav openNavGroup={openNavGroup} handleNavClick={handleNavClick} />
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
    handleNavClick: (navGroup) => dispatch(actions.changeOpenSidenavGroup(navGroup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
