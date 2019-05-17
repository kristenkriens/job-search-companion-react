import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import Button from '../../../UI/Button/Button';
import LinkButton from '../../../UI/Button/LinkButton/LinkButton';
import ApplicationItem from './ApplicationItem/ApplicationItem';
import LoginRequired from '../../../UI/LoginRequired/LoginRequired';

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
      equal = isEqual(prevProps.savedApplications, this.props.savedApplications);
    }

    if(this.props.isAuthenticated && !equal) {
      this.props.getSavedApplications(this.props.token, this.props.userId);

      if(!isEqual(this.props.savedApplications, this.state.savedApplications)) {
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
    const savedApplications = {};

    this.state.savedApplications.forEach((savedApplication, index) => {
      savedApplications[savedApplication.applicationId] = {
        jobkey: savedApplication.jobkey,
        applicationDate: savedApplication.applicationDate,
        result: savedApplication.result,
        order: index
      }
    });

    this.props.changeSavedApplications(this.props.token, this.props.userId, savedApplications);
  };

  remove = (index) => {
    this.props.removeSavedApplication(this.props.token, this.props.userId, this.props.savedApplications[index].applicationId);
  }

  removeAll = () => {
    this.props.removeSavedApplications(this.props.token, this.props.userId);
  };

  changeResult = (result, index) => {
    const updatedApplications = updateObject(this.state.savedApplications, {
      [index]: updateObject(this.state.savedApplications[index], {
        result: result
      })
    });

    this.setState({
      savedApplications: updatedApplications
    });
  }

  render() {
    const { isAuthenticated, results, loading } = this.props;

    return (
      <>
        {isAuthenticated ? (
          <>
            {this.state.savedApplications.length > 0 ? (
              <>
                <h1>Applications</h1>
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
                  <div className="button-wrapper">
                    <Button click={this.save}>Save</Button>
                    <LinkButton click={this.removeAll}>Remove All</LinkButton>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="accessible">Applications</h1>
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
          <>
            <h1 className="accessible">Applications</h1>
            <LoginRequired />
          </>
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
