import React, { Component } from 'react';

class Overview extends Component {
  render() {
    return (
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
    )
  }
}

export default Overview;
