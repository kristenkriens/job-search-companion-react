import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class FollowUps extends Component {
  componentDidMount() {
    this.props.handleNavGroupItemLoaded('track');
  }

  render() {
    return (
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
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleNavGroupItemLoaded: (navGroup) => dispatch(actions.changeOpenSidenavGroup(navGroup))
  }
}

export default connect(null, mapDispatchToProps)(FollowUps);
