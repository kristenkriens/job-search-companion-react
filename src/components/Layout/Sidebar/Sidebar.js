import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Sidebar.scss';
import SidebarNav from './SidebarNav/SidebarNav';
import * as actions from '../../../store/actions/index';

class Sidebar extends Component {
  render() {
    const { openSidebarNavGroup, sidebarNav, handleSidebarNavClick } = this.props;

    return (
      <header className="sidebar">
        <NavLink to='/' exact onClick={() => handleSidebarNavClick('')}>
          <h1>Job Search Companion</h1>
        </NavLink>
        <SidebarNav openSidebarNavGroup={openSidebarNavGroup} sidebarNav={sidebarNav} handleSidebarNavClick={handleSidebarNavClick} />
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    openSidebarNavGroup: state.navigation.openSidebarNavGroup,
    sidebarNav: state.navigation.sidebarNav
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSidebarNavClick: (sidebarNavGroup) => dispatch(actions.changeOpenSidebarNavGroup(sidebarNavGroup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
