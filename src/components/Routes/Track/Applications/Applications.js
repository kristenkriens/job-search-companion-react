import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../../../UI/Button/Button';
import LinkButton from '../../../UI/Button/LinkButton/LinkButton';
import ApplicationItem from './ApplicationItem/ApplicationItem';
import LoginRequired from '../../../UI/LoginRequired/LoginRequired';

import * as actions from '../../../../store/actions/index';

class Applications extends Component {
  state = {
    savedApplicationsObject: this.props.savedApplications
  }

  componentDidMount = () => {
    if(this.props.isAuthenticated) {
      this.props.getSavedApplications(this.props.token, this.props.userId);
    }
  }

  count = 0;
  componentDidUpdate = (prevProps) => {
    let lengths = true;
    let notEqual = true;
    if(this.count > 0) {
      lengths = prevProps.savedApplications.length === 0 && this.props.savedApplications.length === 0;
      notEqual = prevProps.savedApplications === this.props.savedApplications;
    }

    if(this.props.isAuthenticated && lengths && notEqual) {
      this.props.getSavedApplications(this.props.token, this.props.userId);
    }

    this.count++;
  }

  dragStart = (event, index) => {
    this.draggedItem = this.state.savedApplicationsObject[index];
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.parentNode);
    event.dataTransfer.setDragImage(event.target.parentNode, 20, 20);
  };

  dragOver = (index) => {
    const draggedOverItem = this.state.savedApplicationsObject[index];

    if (this.draggedItem !== draggedOverItem) {
      let savedApplicationsObject = this.state.savedApplicationsObject.filter(savedApplication => savedApplication !== this.draggedItem);

      savedApplicationsObject.splice(index, 0, this.draggedItem);

      this.setState({
        savedApplicationsObject: savedApplicationsObject
      });
    }
  };

  dragEnd = () => {
    this.draggedItem = null;

    if(this.removedItem) {
      this.props.removeSavedApplication(this.props.token, this.props.userId, this.removeItem);
    }
  };

  remove = () => {
    this.removedItem = this.draggedItem.applicationId;
  };

  save = () => {
    const savedApplications = {};

    this.state.savedApplicationsObject.forEach((savedApplication) => {
      savedApplications[savedApplication.applicationId] = {
        jobkey: savedApplication.jobkey,
        date: savedApplication.applicationDate
      }
    });

    this.props.changeSavedApplications(this.props.token, this.props.userId, savedApplications);
  };

  removeAll = () => {
    this.props.removeSavedApplications(this.props.token, this.props.userId);
  };

  render() {
    const { isAuthenticated, results, loading } = this.props;

    return (
      <>
        <h1 className="accessible">Applications</h1>
        {isAuthenticated ? (
          <>
            {this.state.savedApplicationsObject.length > 0 ? (
              <div className={`applications ${loading ? 'disable-click' : ''}`} style={{opacity: loading && 0.65}}>
                <div className="table">
                  <table className="table-inner">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Job Posting</th>
                        <th>Application Date</th>
                        <th>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.savedApplicationsObject.map((savedApplication, i) => {
                      return (
                        <ApplicationItem
                          key={savedApplication.jobkey}
                          item={savedApplication}
                          dragOver={() => this.dragOver(i)}
                          dragStart={(event) => this.dragStart(event, i)}
                          dragEnd={this.dragEnd}
                        />
                      )
                    })}
                    </tbody>
                  </table>
                </div>
                <div className="table__delete" onDragOver={this.remove}><i className="fa fa-trash" aria-hidden="true"></i> Drag row here to remove</div>
                <div className="button-wrapper">
                  <Button click={this.save}>Save</Button>
                  <LinkButton click={this.removeAll}>Remove All</LinkButton>
                </div>
              </div>
            ) : (
              <>
                {loading ? (
                  <div className="absolute-center">
                    <div className="h3">Your tracked applications are loading!</div>
                    <i className="fa fa-spinner fa-pulse fa-fw fa-2x"></i>
                  </div>
                ) : (
                  <div className="absolute-center">
                    <div className="h3">Please track some applications first!</div>
                    {results !== null ? (
                      <Link to="/find/results" className="button">Let's Go!</Link>
                    ) : (
                      <Link to="/find/search" className="button">Let's Go!</Link>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <LoginRequired />
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.search.results,
    token: state.auth.token,
    userId: state.auth.userId,
    savedApplications: state.savedApplications.savedApplications,
    loading: state.savedApplications.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedApplications: (token, userId) => dispatch(actions.getSavedApplications(token, userId)),
    changeSavedApplications: (token, userId, savedApplications) => dispatch(actions.changeSavedApplications(token, userId, savedApplications)),
    removeSavedApplication: (token, userId, applicationId) => dispatch(actions.removeSavedApplication(token, userId, applicationId)),
    removeSavedApplications: (token, userId) => dispatch(actions.removeSavedApplications(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Applications);;
