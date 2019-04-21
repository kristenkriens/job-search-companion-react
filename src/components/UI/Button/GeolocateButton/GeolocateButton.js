import React from 'react';

import '../Button.scss';

const GeolocateButton = (props) => {
  const { loading, disabled, geolocate } = props;

  return (
    <button className="button geolocate" disabled={disabled} onClick={geolocate}>
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

export default GeolocateButton;
