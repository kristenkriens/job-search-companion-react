import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import LinkButton from '../.././../../../UI/Button/LinkButton/LinkButton';
import Backdrop from '../../../../../UI/Backdrop/Backdrop';

import * as actions from '../../../../../../store/actions/index';

class Auth extends Component {
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

  logout = () => {
    this.props.closeDropdown();
    this.props.logout();
  }

  openAndSetActiveModal = (activeModal) => {
    this.props.closeDropdown();
    this.props.openAndSetActiveModal(activeModal);
  }

  render() {
    const { isDropdownOpen } = this.props;

    return (
      <>
        <CSSTransition
          in={isDropdownOpen}
          timeout={500}
          classNames="accordion"
          unmountOnExit
        >
          <ul className="topbar__auth-dropdown" ref={this.setWrapperRef}>
            <li><LinkButton click={this.logout}>Log Out</LinkButton></li>
            <li><LinkButton click={() => this.openAndSetActiveModal('edit-profile')}>My Profile</LinkButton></li>
          </ul>
        </CSSTransition>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isDropdownOpen: state.navigation.isDropdownOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.authLogout()),
    openAndSetActiveModal: (activeModal) => dispatch(actions.openAndSetActiveModal(activeModal)),
    closeDropdown: () => dispatch(actions.closeDropdown())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
