import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SearchItem.scss';

import LinkButton from '../../../UI/Button/LinkButton/LinkButton';

import * as actions from '../../../../store/actions/index';

class SearchItem extends Component {
  saveJob = (event, jobkey) => {
    event.preventDefault();

    const savedJob = {
      jobkey: jobkey,
      date: Date.now()
    }

    this.props.setSavedJob(this.props.token, this.props.userId, savedJob);
  }

  removeJob = (event, jobId) => {
    event.preventDefault();

    this.props.removeSavedJob(this.props.token, this.props.userId, jobId);
  }

  render() {
    const { item, type, isAuthenticated } = this.props;
    const { jobId, jobkey, jobtitle, company, formattedLocationFull, snippet, url, formattedRelativeTime, date, expired } = item;

    const todayUnix = new Date().getTime();
    const itemDateUnix = new Date(date).getTime();

    const difference = todayUnix - itemDateUnix;

    let colourClass = '';
    if(difference <= 604800000) { // 7 days
      colourClass = 'green';
    } else if(difference < 2592000000) { // 30 days
      colourClass = 'yellow';
    } else {
      colourClass = 'red';
    }

    return (
      <div className="search-item">
        <div className="search-item__top">
          <div className="search-item__top-left">
            <h3>{jobtitle}</h3>
            <div>
              <span className="company">{company}</span>
              <span className="location">{formattedLocationFull}</span>
            </div>
          </div>
          <div className="search-item__top-right">
            <div className={`date date--${colourClass}`}>{formattedRelativeTime}</div>
            {expired && (
              <div>(Expired)</div>
            )}
          </div>
        </div>
        <div className="search-item__bottom">
          <p dangerouslySetInnerHTML={{__html: snippet}}></p>
          <div className="button-wrapper button-wrapper--inline">
            <a href={url} className="button" target="_blank" rel="noopener noreferrer">More / Apply</a>
            {isAuthenticated && (
              <>
                <LinkButton>
                  Track Application
                </LinkButton>
                {type === 'result' && (
                  <LinkButton click={(event) => this.saveJob(event, jobkey)}>
                    Save
                  </LinkButton>
                )}
                {type === 'saved' && (
                  <LinkButton click={(event) => this.removeJob(event, jobId)}>
                    Remove
                  </LinkButton>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeSavedJob: (token, userId, jobId) => dispatch(actions.removeSavedJob(token, userId, jobId)),
    setSavedJob: (token, userId, savedJob) => dispatch(actions.setSavedJob(token, userId, savedJob))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem);
