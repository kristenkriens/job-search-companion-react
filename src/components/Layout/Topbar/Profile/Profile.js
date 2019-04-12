import React from 'react';

const Profile = (props) => {
  const { isAuthenticated } = props;

  return (
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
          <button className="login">Log In / Create Account</button>
        </div>
      )}
    </div>
  )
}

export default Profile;
