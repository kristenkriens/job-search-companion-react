import axios from 'axios';

import * as actionTypes from './actionTypes';

export const geolocateStart = () => {
  return {
    type: actionTypes.GEOLOCATE_START
  }
};

export const geolocateSuccess = (location) => {
  return {
    type: actionTypes.GEOLOCATE_SUCCESS
  }
};

export const geolocateFail = (error) => {
  return {
    type: actionTypes.GEOLOCATE_FAIL,
    error: error
  }
}

export const geolocate = (lat, lng) => {
  return (dispatch) => {
    dispatch(geolocateStart());

    const apiKey = process.env.REACT_APP_MAPBOX_API_KEY;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?access_token=${apiKey}`;

    axios.post(url)
      .then((response) => {
        dispatch(geolocateSuccess(response));
      })
      .catch((error) => {
        dispatch(geolocateFail(error));
      });
  }
};
