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

    // TODO
    let lat = null;
    let lng = null;
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lng = position.coords.lngitude;
    });

    const apiKey = process.env.REACT_APP_MAPBOX_API_KEY;

    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?access_token=${apiKey}`;

    axios.post(url)
      .then((response) => {
        dispatch(geolocateSuccess(response));
      })
      .catch((error) => {
        dispatch(geolocateFail(error));
      });
  }
};
