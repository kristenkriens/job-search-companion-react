import React from 'react';

import LinkButton from '../../../../UI/Button/LinkButton/LinkButton';

import { countries } from '../../../../../shared/countries';

const SavedSearches = (props) => {
  const { savedSearches, jobTypes } = props;

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
                    countries.map((country) => {
                      if(country.value == search.country) {
                        return (
                          <span>{country.displayValue}</span>
                        )
                      }
                    })
                  )}
                  {search.age && (
                    <span>{search.age} days</span>
                  )}
                  {search.radius && (
                    <span>{search.radius} {search.country !== 'us' ? 'km' : 'mi'}</span>
                  )}
                  {search.jobType && search.jobType !== 'nopreference' && (
                    jobTypes.map((jobType) => {
                      if(jobType.value == search.jobType) {
                        return (
                          <span>{jobType.label}</span>
                        )
                      }
                    })
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
