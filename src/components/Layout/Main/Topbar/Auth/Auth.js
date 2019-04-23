import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Auth.scss';

import * as actions from '../../../../../store/actions/index';
import LinkButton from '../.././../../UI/Button/LinkButton/LinkButton';

class Auth extends Component {
  render() {
    const { isAuthenticated, logout, toggleAndSetActiveModal } = this.props;

    return (
      <div className="topbar__auth">
        {isAuthenticated ? (
          <div>Welcome! <LinkButton click={logout}>(Logout)</LinkButton></div>
        ) : (
          <LinkButton click={() => toggleAndSetActiveModal('login')}>Log In / Create Account</LinkButton>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.authLogout()),
    toggleAndSetActiveModal: (activeModal) => dispatch(actions.toggleAndSetActiveModal(activeModal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
