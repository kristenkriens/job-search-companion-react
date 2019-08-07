import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Auth.scss';

import Dropdown from './Dropdown/Dropdown';
import LinkButton from '../.././../../UI/Button/LinkButton/LinkButton';
import BlankUser from '../../../../../assets/images/blank-user.gif';

import * as actions from '../../../../../store/actions/index';

class Auth extends Component {
  componentDidUpdate = (prevProps) => {
    if (this.props.isAuthenticated && !prevProps.isAuthenticated) {
      this.props.authGetProfile(this.props.token);
    }
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.closeDropdown();
    }
  }

  render() {
    const { isAuthenticated, openAndSetActiveModal, toggleDropdown, displayName, photoUrl, isDropdownOpen } = this.props;

    return (
      <div className="topbar__auth" ref={this.setWrapperRef}>
        {isAuthenticated ? (
          <>
            <div className="topbar__auth-profile">
              <div className="topbar__auth-profile-image" style={{backgroundImage: `url(${photoUrl ? photoUrl : BlankUser})`}}></div>
              <LinkButton additionalClasses="topbar__auth-profile-message" click={toggleDropdown}>
                Welcome{displayName ? `, ${displayName}` : ''}!
                {isDropdownOpen ? (
                  <i className="fa fa-angle-up" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                )}
              </LinkButton>
            </div>
            <Dropdown />
          </>
        ) : (
          <>
            <LinkButton click={() => openAndSetActiveModal('login')}>Log In / Create Account</LinkButton>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    displayName: state.auth.displayName,
    photoUrl: state.auth.photoUrl,
    isDropdownOpen: state.navigation.isDropdownOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openAndSetActiveModal: (activeModal) => dispatch(actions.openAndSetActiveModal(activeModal)),
    authGetProfile: (token) => dispatch(actions.authGetProfile(token)),
    toggleDropdown: () => dispatch(actions.toggleDropdown()),
    closeDropdown: () => dispatch(actions.closeDropdown())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
