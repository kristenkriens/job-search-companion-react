import React from 'react';

import './ResultItem.scss';

import LinkButton from '../../../../UI/Button/LinkButton/LinkButton';

const ResultItem = (props) => {
  const { result, isAuthenticated } = props;
  const { jobtitle, company, formattedLocationFull, snippet, url, formattedRelativeTime, expired } = result;

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
          <div>{formattedRelativeTime}</div>
          {expired && (
            <div>(Expired)</div>
          )}
        </div>
      </div>
      <div className="result__item-bottom">
        <p dangerouslySetInnerHTML={{__html: snippet}}></p>
        <div class="button-wrapper">
          <a href={url} className="button" target="_blank" rel="noopener noreferrer">More / Apply</a>
          {isAuthenticated && (
            // TODO: Add click handler
            <LinkButton click="">
              Track Application
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultItem;
