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

    const url = `http://proxy.hackeryou.com/?reqUrl=https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?access_token=${apiKey}`;

    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };

    axios.post(url, config)
      .then((response) => {
        dispatch(geocodeSuccess(response));
      })
      .catch((error) => {
        dispatch(geocodeFail(error));
      });
  }
};
