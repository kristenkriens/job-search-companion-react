import React, { Component } from 'react';

class Content extends Component {
  render() {
    return (
      <div className="content">
        <div className="content-inner content-inner--search">
          <form className="form">
            <div className="form__element form__element--half">
              <label htmlFor="query">Job Title / Keywords / Company</label>
              <input type="text" id="query" placeholder="e.g. Front End Developer" />
            </div>
            <div className="form__element form__element--half">
              <label htmlFor="location">Address / Location</label>
              <input type="text" id="location" placeholder="e.g. Toronto, ON" />
              <button type="button" className="units units--square">
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
            <button type="submit" className="form__submit">Search</button>
          </form>
          <div className="content-inner__logged-in">
            <p className="form__save">Save Search</p>
            <div className="saved-searches">
              <h2>Saved Searches</h2>
              <p>You don't have any saved searches.</p>
            </div>
          </div>
        </div>
        <div id="map" className="content-inner content-inner--map">
          <h3>Please fill out the search form first!</h3>
        </div>
        <div className="content-inner content-inner--list">
          <h3>Please fill out the search form first!</h3>
        </div>
        <div className="content-inner content-inner--listing"></div>
        <div className="content-inner content-inner--overview">
          <div className="content-inner__logged-out">
            <h3>You need to be logged in to view this page!</h3>
            <button className="login">Log In</button>
          </div>
          <div className="content-inner__logged-in">
            <div className="table">
              <table className="table-inner">
                <thead>
                  <tr>
                    <th></th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Job Posting</th>
                    <th>Result</th>
                    <th>Contact Name</th>
                    <th>Application Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><i className="fa fa-sort" aria-hidden="true"></i></td>
                    <td><input type="text" id="job-title-1" className="job-title" /></td>
                    <td><input type="text" id="company-1" className="company" /></td>
                    <td><input type="text" id="location-1" className="location" /></td>
                    <td><input type="text" id="job-posting-1" className="job-posting" /></td>
                    <td>
                      <select id="result-1" className="result">
                        <option defaultValue></option>
                        <option>Interview</option>
                        <option>Accepted offer</option>
                        <option>Declined offer</option>
                        <option>No response</option>
                        <option>No offer</option>
                        <option>Declined</option>
                        <option>Other</option>
                      </select>
                    </td>
                    <td><input type="text" id="contact-name-1" className="contact-name" /></td>
                    <td><input type="date" id="application-date-1" className="application-date" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table__delete"><i className="fa fa-trash" aria-hidden="true"></i> Drag row here to delete</div>
            <button className="table__add-new">Add New</button>
            <button className="table__save">Save</button>
          </div>
        </div>
        <div className="content-inner content-inner--follow-ups">
          <div className="content-inner__logged-out">
            <h3>You need to be logged in to view this page!</h3>
            <button className="login">Log In</button>
          </div>
          <div className="content-inner__logged-in">
            <div className="table">
              <table className="table-inner">
                <thead>
                  <tr>
                    <th></th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Contact Name</th>
                    <th>Contact Email</th>
                    <th>Contact Title</th>
                    <th>Application Date</th>
                    <th>Follow Up 1</th>
                    <th>Follow Up 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><i className="fa fa-sort" aria-hidden="true"></i></td>
                    <td><input type="text" id="follow-up-job-title-1" className="job-title" /></td>
                    <td><input type="text" id="follow-up-company-1" className="company" /></td>
                    <td><input type="text" id="follow-up-contact-name-1" className="contact-name" /></td>
                    <td><input type="email" id="follow-up-contact-email-1" className="contact-email" /></td>
                    <td><input type="text" id="follow-up-contact-title-1" className="contact-title" /></td>
                    <td><input type="date" id="follow-up-application-date-1" className="application-date" /></td>
                    <td><input type="date" id="follow-up-1-1" className="follow-up-1" /></td>
                    <td><input type="date" id="follow-up-2-1" className="follow-up-2" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table__delete"><i className="fa fa-trash" aria-hidden="true"></i> Drag row here to delete</div>
            <button className="table__add-new">Add New</button>
            <button className="table__save">Save</button>
          </div>
        </div>
        <div className="content-inner content-inner--interviews">
          <div className="content-inner__logged-out">
            <h3>You need to be logged in to view this page!</h3>
            <button className="login">Log In</button>
          </div>
          <div className="content-inner__logged-in">
            <div className="table">
              <table className="table-inner">
                <thead>
                  <tr>
                    <th></th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Address</th>
                    <th>Interviewer Name</th>
                    <th>Interviewer Title</th>
                    <th>Time</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><i className="fa fa-sort" aria-hidden="true"></i></td>
                    <td><input type="text" id="interview-job-title-1" className="interview-job-title" /></td>
                    <td><input type="text" id="interview-company-1" className="interview-company" /></td>
                    <td><input type="text" id="interview-location-1" className="interview-location" /></td>
                    <td><input type="text" id="interview-address-1" className="interview-address" /></td>
                    <td><input type="text" id="interview-interviewer-name-1" className="interviewer-name" /></td>
                    <td><input type="text" id="interview-interviewer-title-1" className="interviewer-title" /></td>
                    <td><input type="text" id="interview-time-1" className="interview-time" /></td>
                    <td><input type="date" id="interview-date-1" className="interview-date" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table__delete"><i className="fa fa-trash" aria-hidden="true"></i> Drag row here to delete</div>
            <button className="table__add-new">Add New</button>
            <button className="table__save">Save</button>
          </div>
        </div>
        <div className="content-inner content-inner--analyze-applications">
          <div className="content-inner__logged-out">
            <h3>You need to be logged in to view this page!</h3>
            <button className="login">Log In</button>
          </div>
          <div className="content-inner__logged-in">
            <div id="applications-chart" className="applications-chart"></div>
          </div>
        </div>
        <div className="content-inner content-inner--analyze-correspondence">
          <form className="form">
            <div className="form__element">
              <label htmlFor="correspondence">Please enter the text you would like to analyze below:</label>
              <textarea id="correspondence"></textarea>
            </div>
            <button type="submit" className="form__submit">Analyze</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Content;
