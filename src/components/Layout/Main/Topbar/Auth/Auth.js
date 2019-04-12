import React from 'react';

const Auth = (props) => {
  const { isAuthenticated } = props;

  return (
    <div className="topbar__auth">
      {isAuthenticated ? (
        <div class="topbar__auth-profile">
          <div className="topbar__image">
            <img src="./assets/images/blank-user.gif" alt="Blank User" />
          </div>
          <div>Hello, <span className="topbar__auth-name">Anonymous</span>!<i className="fa fa-angle-down" aria-hidden="true"></i></div>
          <ul className="topbar__auth-dropdown">
            <li className="topbar__auth-dropdown-item logout">Log Out</li>
            <li className="topbar__auth-dropdown-item my-profile">My Profile</li>
          </ul>
        </div>
      ) : (
        <button className="login">Log In / Create Account</button>
      )}
    </div>
  )
}

export default Auth;
