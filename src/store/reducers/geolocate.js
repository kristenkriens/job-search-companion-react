import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  error: null,
  loading: false,
  lat: null,
  lng: null,
  location: '',
  countryCode: ''
}

const geolocateLatLngStart = (state, action) => {
  const updatedState = {
    loading: true,
    lat: null,
    lng: null
  };

  return updateObject(state, updatedState);
}

const geolocateLatLngSuccess = (state, action) => {
  const updatedState = {
    lat: action.lat,
    lng: action.lng
  };

  return updateObject(state, updatedState);
}

const geolocateGeocodeStart = (state, action) => {
  const updatedState = {
    error: null
  };

  return updateObject(state, updatedState);
}

const geolocateGeocodeSuccess = (state, action) => {
  const updatedState = {
    error: null,
    loading: false,
    location: action.location,
    countryCode: action.countryCode
  };

  return updateObject(state, updatedState);
}

const geolocateGeocodeFail = (state, action) => {
  const updatedState = {
    error: action.error,
    loading: false
  };

  return updateObject(state, updatedState);
}

const geolocateReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GEOLOCATE_LAT_LNG_START: return geolocateLatLngStart(state, action);
    case actionTypes.GEOLOCATE_LAT_LNG_SUCCESS: return geolocateLatLngSuccess(state, action);
    case actionTypes.GEOLOCATE_GEOCODE_START: return geolocateGeocodeStart(state, action);
    case actionTypes.GEOLOCATE_GEOCODE_SUCCESS: return geolocateGeocodeSuccess(state, action);
    case actionTypes.GEOLOCATE_GEOCODE_FAIL: return geolocateGeocodeFail(state, action);
    default: return state;
  }
}

export default geolocateReducer;
