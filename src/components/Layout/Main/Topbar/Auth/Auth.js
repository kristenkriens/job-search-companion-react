import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions/index';

class Auth extends Component {
  toggleAndSetActiveModal = (activeModal) => {
    const { toggleModal, setActiveModal } = this.props;

    setActiveModal(activeModal);
    toggleModal();
  }

  render() {
    const { isAuthenticated, logout } = this.props;

    return (
      <div className="topbar__auth">
        {isAuthenticated ? (
          <div>Welcome! <button className="underline" onClick={logout}>(Logout)</button></div>
        ) : (
          <button onClick={() => this.toggleAndSetActiveModal('login')}>Login / Create Account</button>
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
    toggleModal: () => dispatch(actions.toggleModal()),
    setActiveModal: (activeModal) => dispatch(actions.setActiveModal(activeModal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
