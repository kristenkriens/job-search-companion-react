import axios from 'axios';

import * as actionTypes from './actionTypes';
import { searchFormUpdateElement } from './search';
import { openAndSetActiveModalAndMessage } from './modal';
import { getApiKey } from '../../shared/utilities';

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

export const geolocateGeocodeSuccess = () => {
  return {
    type: actionTypes.GEOLOCATE_GEOCODE_SUCCESS
  }
};

export const geolocateGeocodeSuccessUpdateReduxHandledFormElement = (location, country) => {
  return (dispatch) => {
    dispatch(searchFormUpdateElement('location', location));
    dispatch(searchFormUpdateElement('country', country));
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

    const apiKey = getApiKey('mapbox');

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place,country&access_token=${apiKey}`;

    axios.get(url)
      .then((response) => {
        const countryFull = response.data.features[1].place_name;
        const country = response.data.features[1].properties.short_code;
        const location = response.data.features[0].place_name.replace(`, ${countryFull}`, '');

        dispatch(geolocateGeocodeSuccess());
        dispatch(geolocateGeocodeSuccessUpdateReduxHandledFormElement(location, country));
      }).catch((error) => {
        const errorMessage = 'Your location could not be found';

        dispatch(geolocateGeocodeFail(errorMessage));
        dispatch(openAndSetActiveModalAndMessage('error', errorMessage));
      });
  }
};
