import React from 'react';

import './SearchItem.scss';

import LinkButton from '../../../UI/Button/LinkButton/LinkButton';

const SearchItem = (props) => {
  const { item, type, isAuthenticated } = props;
  const { jobtitle, company, formattedLocationFull, snippet, url, formattedRelativeTime, date } = item;

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
        </div>
      </div>
      <div className="search-item__bottom">
        <p dangerouslySetInnerHTML={{__html: snippet}}></p>
        <div className="button-wrapper button-wrapper--inline">
          <a href={url} className="button" target="_blank" rel="noopener noreferrer">More / Apply</a>
          {isAuthenticated && (
            <>
              {type === 'result' && (
                <>
                  <LinkButton>
                    Save
                  </LinkButton>
                  <LinkButton>
                    Track Application
                  </LinkButton>
                </>
              )}
              {type === 'saved' && (
                <LinkButton>
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

export default SearchItem;
