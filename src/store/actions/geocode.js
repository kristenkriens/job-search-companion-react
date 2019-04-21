import axios from 'axios';

import * as actionTypes from './actionTypes';

export const geocodeStart = () => {
  return {
    type: actionTypes.GEOCODE_START
  }
};

export const geocodeSuccess = (location) => {
  return {
    type: actionTypes.GEOCODE_SUCCESS,
    location: location
  }
};

export const geocodeFail = (error) => {
  return {
    type: actionTypes.GEOCODE_FAIL,
    error: error
  }
}

export const geocode = (lat, lng) => {
  return (dispatch) => {
    dispatch(geocodeStart());

    const apiKey = process.env.REACT_APP_MAPBOX_API_KEY;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place,country&access_token=${apiKey}`;

    axios.get(url)
      .then((response) => {
        const country = response.data.features[1].place_name;
        const location = response.data.features[0].place_name.replace(`, ${country}`, '');

        dispatch(geocodeSuccess(location));
      })
      .catch((error) => {
        dispatch(geocodeFail(error));
      });
  }
};
