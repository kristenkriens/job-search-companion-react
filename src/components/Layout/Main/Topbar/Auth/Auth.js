import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Auth.scss';

import LinkButton from '../.././../../UI/Button/LinkButton/LinkButton';
import BlankUser from '../../../../../assets/images/blank-user.gif';

import * as actions from '../../../../../store/actions/index';

class Auth extends Component {
  componentDidUpdate = (prevProps) => {
    if (this.props.isAuthenticated && !prevProps.isAuthenticated) {
      this.props.authGetProfile(this.props.token);
    }
  }

  render() {
    const { isAuthenticated, logout, openAndSetActiveModal, displayName, photoUrl } = this.props;

    return (
      <div className="topbar__auth">
        {isAuthenticated ? (
          <>
            <div className="topbar__auth-image" style={{backgroundImage: `url(${photoUrl ? photoUrl : BlankUser})`}}></div>
            <div className="topbar__auth-message">Welcome{displayName ? `, ${displayName}` : ''}! <LinkButton click={logout}>(Logout)</LinkButton></div>
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
    photoUrl: state.auth.photoUrl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.authLogout()),
    openAndSetActiveModal: (activeModal) => dispatch(actions.openAndSetActiveModal(activeModal)),
    authGetProfile: (token) => dispatch(actions.authGetProfile(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
