import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../../../UI/Button/Button';

import * as actions from '../../../../../../store/actions/index';

class Register extends Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    const { auth, setActiveModal } = this.props;

    return (
      <>
        <h2>Create Account</h2>
        <form onSubmit={auth(this.state.email, this.state.password, true)}>
          <div className="form__element">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="e.g. fake-email@gmail.com" />
          </div>
          <div className="form__element">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="form__element">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" />
          </div>
          <Button type="submit" additionalClasses="modal__submit" disabled>Submit</Button>
          <button className="modal__link" onClick={() => setActiveModal('login')}>Already have an account? Log In</button>
        </form>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    setActiveModal: (modalType) => dispatch(actions.setActiveModal(modalType))
  }
}

export default connect(null, mapDispatchToProps)(Register);
