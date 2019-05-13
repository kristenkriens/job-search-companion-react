import React from 'react';

import '../Button.scss';

import Loading from '../../Loading/Loading';

const GeolocateButton = (props) => {
  const { loading, disabled, geolocate } = props;

  return (
    <button className="button geolocate" disabled={disabled} onClick={geolocate}>
      <Loading loading={loading}>
        <i className="fa fa-location-arrow" aria-hidden="true"></i>
        <span className="accessible">Get Geolocation</span>
      </Loading>
    </button>
  )
}

export default GeolocateButton;
