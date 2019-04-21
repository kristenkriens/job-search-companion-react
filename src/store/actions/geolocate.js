import axios from 'axios';

import * as actionTypes from './actionTypes';

export const geolocateLatLngStart = () => {
  return {
    type: actionTypes.GEOLOCATE_LAT_LNG_START
  }
};

export const geolocateLatLngSuccess = (lat, lng) => {
  return {
    type: actionTypes.GEOLOCATE_LAT_LNG_SUCCESS,
    lat: lat,
    lng: lng
  }
};

export const geolocateLatLng = () => {
  return (dispatch) => {
    dispatch(geolocateLatLngStart());

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      dispatch(geolocateLatLngSuccess(lat, lng));
      dispatch(geolocateGeocode(lat, lng));
    });
  }
};

export const geolocateGeocodeStart = () => {
  return {
    type: actionTypes.GEOLOCATE_GEOCODE_START
  }
};

export const geolocateGeocodeSuccess = (location, countryCode) => {
  return {
    type: actionTypes.GEOLOCATE_GEOCODE_SUCCESS,
    location: location,
    countryCode: countryCode
  }
};

export const geolocateGeocodeFail = (error) => {
  return {
    type: actionTypes.GEOLOCATE_GEOCODE_FAIL,
    error: error
  }
}

export const geolocateGeocode = (lat, lng) => {
  return (dispatch) => {
    dispatch(geolocateGeocodeStart());

    const apiKey = process.env.REACT_APP_MAPBOX_API_KEY;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place,country&access_token=${apiKey}`;

    axios.get(url)
      .then((response) => {
        const country = response.data.features[1].place_name;
        const countryCode = response.data.features[1].properties.short_code;
        const location = response.data.features[0].place_name.replace(`, ${country}`, '');

        dispatch(geolocateGeocodeSuccess(location, countryCode));
      })
      .catch((error) => {
        dispatch(geolocateGeocodeFail(error));
      });
  }
};
