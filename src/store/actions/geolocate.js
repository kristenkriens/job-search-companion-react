import axios from 'axios';

import * as actionTypes from './actionTypes';
import { turnSpacesIntoPlusses } from '../../shared/utilities';


export const geolocateStart = () => {
  return {
    type: actionTypes.GEOLOCATE_START
  }
};

export const geolocateSuccess = (results) => {
  return {
    type: actionTypes.GEOLOCATE_SUCCESS,
    results: results
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

    const apiKey = process.env.REACT_APP_MAPBOX_API_KEY;

    let url = `http://api.indeed.com/ads/apisearch?publisher=${apiKey}`;

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
