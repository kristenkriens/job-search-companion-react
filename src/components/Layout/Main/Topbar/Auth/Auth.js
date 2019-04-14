import React, { Component } from 'react';

import Modal from '../../../../UI/Modal/Modal';
import Profile from './Profile/Profile';
import Login from './Login/Login';

const Auth = (props) => {
  const { isAuthenticated, isModalOpen, toggleModal } = props;

  return (
    <div className="topbar__auth">
      {!isAuthenticated ? (
        <div>Hello, Anonymous! <button className="underline">(Logout)</button></div>
      ) : (
        <>
          <button onClick={toggleModal}>Log In / Create Account</button>
          <Modal isModalOpen={isModalOpen} toggleModal={toggleModal} title="Login">
            <Login />
          </Modal>
        </>
      )}
    </div>
  )
}

export default Auth;
