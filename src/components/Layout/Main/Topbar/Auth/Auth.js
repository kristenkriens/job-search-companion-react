import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions/index';

class Auth extends Component {
  render() {
    const { isAuthenticated, logout, setOpenModal } = this.props;

    return (
      <div className="topbar__auth">
        {isAuthenticated ? (
          <div>Welcome! <button className="underline" onClick={logout}>(Logout)</button></div>
        ) : (
          <button onClick={() => setOpenModal('login')}>Login / Create Account</button>
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
    setOpenModal: (openModal) => dispatch(actions.setOpenModal(openModal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
