import React, { Component } from 'react';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';

import Button from '../../../UI/Button/Button';
import LinkButton from '../../../UI/Button/LinkButton/LinkButton';
import ApplicationItem from './ApplicationItem/ApplicationItem';
import LoginRequiredMessage from '../../../UI/CenteredMessages/LoginRequiredMessage/LoginRequiredMessage';
import LoadingMessage from '../../../UI/CenteredMessages/LoadingMessage/LoadingMessage';
import ButtonMessage from '../../../UI/CenteredMessages/ButtonMessage/ButtonMessage';

import './Applications.scss';

import * as actions from '../../../../store/actions/index';
import { updateObject } from '../../../../shared/utilities';

class Applications extends Component {
  state = {
    savedApplications: this.props.savedApplications
  }

  componentDidMount = () => {
    if(this.props.isAuthenticated) {
      this.props.getSavedApplications(this.props.token, this.props.userId);
    }
  }

  count = 0;
  componentDidUpdate = (prevProps) => {
    let equal = false;
    if(this.count > 0) {
      equal = _isEqual(prevProps.savedApplications, this.props.savedApplications);
    }

    if(this.props.isAuthenticated && !equal) {
      this.props.getSavedApplications(this.props.token, this.props.userId);

      if(!_isEqual(this.props.savedApplications, this.state.savedApplications)) {
        this.setState({
          savedApplications: this.props.savedApplications
        })
      }
    }

    this.count++;
  }

  dragStart = (event, index) => {
    this.draggedItem = this.state.savedApplications[index];
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.parentNode);
    event.dataTransfer.setDragImage(event.target.parentNode, 20, 20);
  };

  dragOver = (index) => {
    const draggedOverItem = this.state.savedApplications[index];

    if (this.draggedItem !== draggedOverItem) {
      let savedApplications = this.state.savedApplications.filter(savedApplication => savedApplication !== this.draggedItem);

      savedApplications.splice(index, 0, this.draggedItem);

      this.setState({
        savedApplications: savedApplications
      });
    }
  };

  save = () => {
    const savedApplications = this.state.savedApplications.reduce(
      (savedApplicationsResult, currentApplication, index) => ({
        ...savedApplicationsResult,
        [currentApplication.applicationId]: {
          jobkey: currentApplication.jobkey,
          applicationDate: currentApplication.applicationDate,
          result: currentApplication.result || '',
          order: index
        }
      }),
      {}
    );

    this.props.changeSavedApplications(this.props.token, this.props.userId, savedApplications);
  };

  remove = (index) => {
    this.props.removeSavedApplication(this.props.token, this.props.userId, this.props.savedApplications[index].applicationId);
  }

  removeAll = () => {
    this.props.removeSavedApplications(this.props.token, this.props.userId);
  };

  changeResult = (result, index) => {
    const updatedApplicationItem = updateObject(this.state.savedApplications[index], {
      result: result
    });

    this.state.savedApplications.splice(index, 1, updatedApplicationItem);

    this.setState({
      savedApplications: this.state.savedApplications
    });
  }

  render() {
    const { isAuthenticated, results, loading } = this.props;

    const title = 'Applications';

    const ApplicationsView = () => (
      <>
        <h1>{title}</h1>
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {this.state.savedApplications.map((savedApplication, i) => {
                return (
                  <ApplicationItem
                    key={savedApplication.jobkey}
                    item={savedApplication}
                    dragOver={() => this.dragOver(i)}
                    dragStart={(event) => this.dragStart(event, i)}
                    dragEnd={this.dragEnd}
                    changeResult={(event) => this.changeResult(event.target.value, i)}
                    remove={() => this.remove(i)}
                  />
                )
              })}
              </tbody>
            </table>
          </div>
          <p className="applications-note"><i className="fa fa-sort" aria-hidden="true"></i> = Drag to change order</p>
          <div className="button-wrapper">
            <Button click={this.save}>Save</Button>
            <LinkButton click={this.removeAll}>Remove All</LinkButton>
          </div>
        </div>
      </>
    );

    const LoadingView = () => (
      <>
        <h1 className="accessible">{title}</h1>
        <LoadingMessage message="Your tracked applications are loading!" />
      </>
    );

    const NoApplicationsView = () => (
      <>
        <h1 className="accessible">{title}</h1>
        <ButtonMessage message="Please track some applications first!" buttonLink={results !== null ? '/find/results' : '/find/search'} buttonText="Let's Go" />
      </>
    );

    const NotAuthenticatedView = () => (
      <>
        <h1 className="accessible">{title}</h1>
        <LoginRequiredMessage />
      </>
    );

    return (
      <>
        {isAuthenticated ? (
          <>
            {this.state.savedApplications.length > 0 ? (
              <ApplicationsView />
            ) : (
              <>
                {loading ? (
                  <LoadingView />
                ) : (
                  <NoApplicationsView />
                )}
              </>
            )}
          </>
        ) : (
          <NotAuthenticatedView />
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

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
