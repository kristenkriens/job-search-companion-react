import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../Button/Button';

import * as actions from '../../../store/actions/index';

class LoginRequired extends Component {
  render() {
    const { toggleAndSetActiveModal } = this.props;

    return (
      <div className="absolute-center">
        <div className="h3">You need to be logged in to view this page!</div>
        <Button click={() => toggleAndSetActiveModal('login')}>Log In</Button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAndSetActiveModal: (activeModal) => dispatch(actions.toggleAndSetActiveModal(activeModal))
  }
}

export default connect(null, mapDispatchToProps)(LoginRequired);
