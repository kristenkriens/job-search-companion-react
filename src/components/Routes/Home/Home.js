import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../UI/Button/Button';

import * as actions from '../../../store/actions/index';

class Home extends Component {
  render() {
    const { isAuthenticated, openAndSetActiveModal } = this.props;

    return (
      <>
        <h1 className="accessible">Home</h1>
        <div className="absolute-center">
          {isAuthenticated ? (
            <div className="h3">Click on the items in the navigation to get started!</div>
          ) : (
            <>
              <div className="h3">Log in or click on the items in the navigation to get started!</div>
              <Button click={() => openAndSetActiveModal('login')}>Log In</Button>
            </>
          )}
        </div>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openAndSetActiveModal: (activeModal) => dispatch(actions.openAndSetActiveModal(activeModal))
  }
}

export default connect(null, mapDispatchToProps)(Home);
