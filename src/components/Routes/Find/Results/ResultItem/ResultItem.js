import React from 'react';

import './ResultItem.scss';

import LinkButton from '../../../../UI/Button/LinkButton/LinkButton';

const ResultItem = (props) => {
  const { result, isAuthenticated } = props;
  const { jobtitle, company, formattedLocationFull, snippet, url, formattedRelativeTime, date } = result;

  const todayUnix = new Date().getTime();
  const resultDateUnix = new Date(date).getTime();

  const difference = todayUnix - resultDateUnix;

  let colourClass = '';
  if(difference <= 604800000) { // 7 days
    colourClass = 'green';
  } else if(difference < 2592000000) { // 30 days
    colourClass = 'yellow';
  } else {
    colourClass = 'red';
  }

  return (
    <div className="result__item">
      <div className="result__item-top">
        <div className="result__item-top-left">
          <h3>{jobtitle}</h3>
          <div>
            <span className="company">{company}</span>
            <span className="location">{formattedLocationFull}</span>
          </div>
        </div>
        <div className="result__item-top-right">
          <div className={`date date--${colourClass}`}>{formattedRelativeTime}</div>
        </div>
      </div>
      <div className="result__item-bottom">
        <p dangerouslySetInnerHTML={{__html: snippet}}></p>
        <div className="button-wrapper">
          <a href={url} className="button" target="_blank" rel="noopener noreferrer">More / Apply</a>
          {isAuthenticated && (
            // TODO: Add click handler
            <LinkButton>
              Track Application
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultItem;
