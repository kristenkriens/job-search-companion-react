import React from 'react';

import './ResultItem.scss';

const ResultItem = (props) => {
  const { result } = props;
  const { jobtitle, company, formattedLocationFull, snippet, url, formattedRelativeTime } = result;

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
        </div>
      </div>
      <div className="result__item-bottom">
        <p dangerouslySetInnerHTML={{__html: snippet}}></p>
        <a href={url} className="button" target="_blank" rel="noopener noreferrer">More</a>
      </div>
    </div>
  )
}

export default ResultItem;
