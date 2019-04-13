import React, { Component } from 'react';

import Button from '../../../UI/Button/Button';

class FollowUps extends Component {
  render() {
    const { isAuthenticated } = this.props;

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
            <div class="button-wrapper">
              <Button>Add New</Button>
              <Button>Save</Button>
            </div>
          </>
        ) : (
          <>
            <h3>You need to be logged in to view this page!</h3>
            <Button>Log In</Button>
          </>
        )}
      </>
    )
  }
}

export default FollowUps;
