import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <header className="sidebar">
        <h1>Job Search Companion</h1>
        <nav>
          <ul className="sidebar__primary">
            <li className="sidebar__primary-item"><i className="fa fa-search" aria-hidden="true"></i>Find Jobs</li>
            <ul className="sidebar__secondary">
              <li className="sidebar__secondary-item sidebar__secondary-item--search">Search Form</li>
              <li className="sidebar__secondary-item sidebar__secondary-item--map">Map View</li>
              <li className="sidebar__secondary-item sidebar__secondary-item--list">List View</li>
              <li className="sidebar__secondary-item sidebar__secondary-item--listing">Listing</li>
            </ul>
            <li className="sidebar__primary-item"><i className="fa fa-book" aria-hidden="true"></i>Track Applications</li>
            <ul className="sidebar__secondary">
              <li className="sidebar__secondary-item sidebar__secondary-item--overview">Overview</li>
              <li className="sidebar__secondary-item sidebar__secondary-item--follow-ups">Follow Ups</li>
              <li className="sidebar__secondary-item sidebar__secondary-item--interviews">Interviews</li>
            </ul>
            <li className="sidebar__primary-item"><i className="fa fa-line-chart" aria-hidden="true"></i>Analyze</li>
            <ul className="sidebar__secondary">
              <li className="sidebar__secondary-item sidebar__secondary-item--analyze-applications">Applications</li>
              <li className="sidebar__secondary-item sidebar__secondary-item--analyze-correspondence">Correspondence</li>
            </ul>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Sidebar;
