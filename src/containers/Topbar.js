import React, { Component } from 'react';

class Topbar extends Component {
  render() {
    return (
      <div className="topbar">
        <div className="topbar__current"><span className="topbar__current-parent"></span><span className="topbar__current-self"></span></div>
        <div className="topbar__profile">
          <div className="topbar__profile-status topbar__profile-status--logged-out">
            <p className="login">Log In / Create Account</p>
          </div>
          <div className="topbar__profile-status topbar__profile-status--logged-in">
            <div className="topbar__image">
              <img src="./assets/images/blank-user.gif" alt="Blank User" />
            </div>
            <p>Hello, <span className="topbar__profile-name">Anonymous</span>!<i className="fa fa-angle-down" aria-hidden="true"></i></p>
            <ul className="topbar__profile-dropdown">
              <li className="topbar__profile-dropdown-item logout">Log Out</li>
              <li className="topbar__profile-dropdown-item my-profile">My Profile</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Topbar;
