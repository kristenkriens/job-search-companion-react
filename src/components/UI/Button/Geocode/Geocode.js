import React from 'react';

import '../Button.scss';

const Geocode = (props) => {
  const { loading, disabled, geocode } = props;

  return (
    <button className="button geocode" disabled={disabled} onClick={geocode}>
      {loading ? (
        <>
          <i className="fa fa-spinner fa-pulse fa-fw"></i>
          <span className="accessible">Loading...</span>
        </>
      ) : (
        <>
          <i className="fa fa-location-arrow" aria-hidden="true"></i>
          <span className="accessible">Get Geolocation</span>
        </>
      )}
    </button>
  )
}

export default Geocode;
