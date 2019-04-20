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

export const geolocate = () => {
  return (dispatch) => {
    dispatch(geolocateStart());

    // Function for getting current lat and lng is needed!
    console.log(navigator.geolocation); // Use to get lat and lng

    const lat = null;
    const lng = null;

    const apiKey = process.env.REACT_APP_MAPBOX_API_KEY;

    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?access_token=${apiKey}`;

    const searchData = {}

    axios.post(url, searchData)
      .then((response) => {
        dispatch(geolocateSuccess(response));
      })
      .catch((error) => {
        dispatch(geolocateFail(error));
      });
  }
};
