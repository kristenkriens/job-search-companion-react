import React, { Component } from 'react';

import Button from '../../../UI/Button/Button';
import LinkButton from '../../../UI/Button/LinkButton/LinkButton';

class Interviews extends Component {
  render() {
    const { isAuthenticated, toggleAndSetActiveModal } = this.props;

    return (
      <>
        {isAuthenticated ? (
          <>
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
            <div className="button-wrapper">
              <Button>Add New</Button>
              <LinkButton>Save</LinkButton>
            </div>
          </>
        ) : (
          <>
            <div className="h3">You need to be logged in to view this page!</div>
            <Button click={() => toggleAndSetActiveModal('login')}>Log In</Button>
          </>
        )}
      </>
    )
  }
}

export default Interviews;
