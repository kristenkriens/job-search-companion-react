import React from 'react';

const Topbar = (props) => {
  const { isAuthenticated } = props;

  return (
    <div className="topbar">
      <div className="topbar__current"><span className="topbar__current-parent"></span><span className="topbar__current-self"></span></div>
      <div className="topbar__profile">
        {isAuthenticated ? (
          <div className="topbar__profile-status">
            <div className="topbar__image">
              <img src="./assets/images/blank-user.gif" alt="Blank User" />
            </div>
            <div>Hello, <span className="topbar__profile-name">Anonymous</span>!<i className="fa fa-angle-down" aria-hidden="true"></i></div>
            <ul className="topbar__profile-dropdown">
              <li className="topbar__profile-dropdown-item logout">Log Out</li>
              <li className="topbar__profile-dropdown-item my-profile">My Profile</li>
            </ul>
          </div>
        ) : (
          <div className="topbar__profile-status">
            <button className="topbar__login">Log In / Create Account</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Topbar;
