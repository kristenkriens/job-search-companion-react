import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormElement from '../../../UI/FormElement/FormElement';
import Button from '../../../UI/Button/Button';

import * as forms from '../../../../shared/forms';
import * as actions from '../../../../store/actions/index';

class Search extends Component {
  state = {
    form: {
      query: {
        widths: ['half'],
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'e.g. Front End Developer'
        },
        label: 'Job Title / Keywords / Company',
        value: '',
      },
      location: {
        widths: ['half'],
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'e.g. Toronto, ON'
        },
        hasGeocode: true,
        label: 'Location',
        value: '',
      },
      age: {
        widths: ['half', 'half-small'],
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'e.g. 7'
        },
        label: 'Max Days Old',
        value: '',
      },
      radius: {
        widths: ['half', 'half-small'],
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'e.g. 10',
        },
        label: 'Search Radius (km)',
        value: '',
      },
      jobType: {
        elementType: 'radio',
        elementConfig: {
          choices: [
            { value: 'nopreference', label: 'No Preference' },
            { value: 'fulltime', label: 'Full Time' },
            { value: 'parttime', label: 'Part Time' },
            { value: 'contract', label: 'Contract' },
            { value: 'internship', label: 'Internship' },
            { value: 'temporary', label: 'Temporary' }
          ]
        },
        label: 'Job Type',
        value: 'nopreference'
      }
    }
  }

  componentDidMount = () => {
    const { userIp, userAgent, lat, lng, getUserIp, getUserAgent, getUserLatLng } = this.props;

    if(!userIp) {
      getUserIp();
    }

    if(!userAgent) {
      getUserAgent();
    }

    if(!lat && !lng) {
      getUserLatLng();
    }
  }

  render() {
    const { isAuthenticated, userIp, userAgent, lat, lng, loading, geocodeLoading, location } = this.props;

    const formElementsArray = forms.createFormElementsArray(this.state.form);

    return (
      <>
        <form onSubmit={(event) => forms.submitSearchForm(this, event, userIp, userAgent)} className="form">
          {formElementsArray.map((formElement) => {
            return (
              <FormElement
                key={formElement.id}
                id={formElement.id}
                widths={formElement.config.widths}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                hasGeocode={formElement.config.hasGeocode}
                label={formElement.config.label}
                value={formElement.config.value}
                geocodeLoading={geocodeLoading}
                geocodeDisabled={!lat && !lng}
                geocode={(event) => forms.geolocationClick(this, event, lat, lng)}
                location={location}
                changed={(event) => forms.formElementChanged(this, event, formElement.id)}
              />
            )
          })}
          <Button type="submit" loading={loading} disabled={!userAgent && !userIp}>Search</Button>
        </form>
        {isAuthenticated && (
          <>
            <p className="form__save">Save Search</p>
            <div className="saved-searches">
              <h2>Saved Searches</h2>
              <p>You don't have any saved searches.</p>
            </div>
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userIp: state.user.userIp,
    userAgent: state.user.userAgent,
    lat: state.user.lat,
    lng: state.user.lng,
    loading: state.search.loading,
    geocodeLoading: state.geocode.loading,
    location: state.geocode.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserIp: () => dispatch(actions.getUserIp()),
    getUserAgent: () => dispatch(actions.getUserAgent()),
    getUserLatLng: () => dispatch(actions.getUserLatLng()),
    search: (userAgent, userIp, query, location, country, radius, jobType, age) => dispatch(actions.search(userAgent, userIp, query, location, country, radius, jobType, age)),
    geocode: (lat, lng) => dispatch(actions.geocode(lat, lng)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
