import React from 'react';

import LinkButton from '../../../../UI/Button/LinkButton/LinkButton';

const SavedSearches = (props) => {
  const { savedSearches } = props;

  return (
    <>
      <div className="saved-searches">
        <h3>Saved Searches</h3>
        {savedSearches.length > 0 ? (
          <ul className="saved-searches__list">
            {savedSearches.map((search) => {
              return (
                <li key={search.date}>
                  {search.query && (
                    <span>{search.query}</span>
                  )}
                  {search.location && (
                    <span>{search.location}</span>
                  )}
                  {search.country && (
                    <span>{search.country}</span>
                  )}
                  {search.age && (
                    <span>{search.age} days</span>
                  )}
                  {search.radius && (
                    <span>{search.radius} {search.country !== 'us' ? 'km' : 'mi'}</span>
                  )}
                  {search.jobType && search.jobType !== 'nopreference' && (
                    <span>{search.jobType}</span>
                  )}
                  <div className="button-wrapper button-wrapper--inline">
                    <LinkButton>Use</LinkButton>
                    <LinkButton>Remove</LinkButton>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <p>You don't have any saved searches.</p>
        )}
      </div>
    </>
  )
}
export default SavedSearches;
