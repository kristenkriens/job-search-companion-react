import React, { Component } from 'react';

class Search extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <>
        <form className="form">
          <div className="form__element form__element--half">
            <label htmlFor="query">Job Title / Keywords / Company</label>
            <input type="text" id="query" placeholder="e.g. Front End Developer" />
          </div>
          <div className="form__element form__element--half">
            <label htmlFor="location">Address / Location</label>
            <input type="text" id="location" placeholder="e.g. Toronto, ON" />
            <button type="button" className="button units units--square">
              <i className="fa fa-location-arrow" aria-hidden="true"></i>
              <span className="accessible">Get Geolocation</span>
            </button>
          </div>
          <div className="form__element form__element--half form__element--half-small">
            <label htmlFor="postAge">Max Days Old</label>
            <input type="number" id="postAge" placeholder="e.g. 7" />
          </div>
          <div className="form__element form__element--half form__element--half-small">
            <label htmlFor="radius">Search Radius</label>
            <input type="number" id="radius" placeholder="e.g. 10" />
            <div className="units units--select">
              <select id="radiusUnits">
                <option defaultValue>km</option>
                <option>mi</option>
              </select>
            </div>
          </div>
          <div className="form__element">
            <legend>Job Type</legend>
            <ul>
              <li>
                <input type="checkbox" id="noPreference" name="jobType" value="nopreference" className="accessible" checked />
                <label htmlFor="noPreference">No Preference</label>
              </li>
              <li>
                <input type="checkbox" id="fulltime" name="jobType" value="fulltime" className="accessible" />
                <label htmlFor="fulltime">Full Time</label>
              </li>
              <li>
                <input type="checkbox" id="parttime" name="jobType" value="parttime" className="accessible" />
                <label htmlFor="parttime">Part Time</label>
              </li>
              <li>
                <input type="checkbox" id="contract" name="jobType" value="contract" className="accessible" />
                <label htmlFor="contract">Contract</label>
              </li>
              <li>
                <input type="checkbox" id="internship" name="jobType" value="internship" className="accessible" />
                <label htmlFor="internship">Internship</label>
              </li>
              <li>
                <input type="checkbox" id="temporary" name="jobType" value="temporary" className="accessible" />
                <label htmlFor="temporary">Temporary</label>
              </li>
            </ul>
          </div>
          <button type="submit" className="button">Search</button>
        </form>
        {isAuthenticated && (
          <>
            <p className="form__save">Save Search</p>
            <div className="saved-searches">
              <h2>Saved Searches</h2>
              <p>You don't have any saved searches.</p>
            </div>
          </>
        )}
      </>
    )
  }
}

export default Search;
