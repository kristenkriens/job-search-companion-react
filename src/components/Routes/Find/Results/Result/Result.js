import React from 'react';

import './Result.scss';

const Result = (props) => {
  const { result } = props;
  const { jobtitle, company, formattedLocationFull, snippet, url, formattedRelativeTime } = result;

  console.log(result);

  return (
    <div className="result">
      <div className="result__top">
        <div className="result__top-left">
          <h3>{jobtitle}</h3>
          <div>
            <span className="company">{company}</span>
            <span className="location">{formattedLocationFull}</span>
          </div>
        </div>
        <div className="result__top-right">
          <div>{formattedRelativeTime}</div>
        </div>
      </div>
      <div className="result__bottom">
        <p dangerouslySetInnerHTML={{__html: snippet}}></p>
        <a href={url} className="button" target="_blank" rel="noopener noreferrer">More</a>
      </div>
    </div>
  )
}

export default Result;
