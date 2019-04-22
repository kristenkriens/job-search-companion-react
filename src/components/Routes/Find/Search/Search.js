import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormElement from '../../../UI/FormElement/FormElement';
import Button from '../../../UI/Button/Button';
import LinkButton from '../../../UI/Button/LinkButton/LinkButton';

import { countries } from '../../../../shared/countries';
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
        hasGeolocateButton: true,
        label: 'Location',
        value: this.props.location,
        handledByRedux: true
      },
      country: {
        widths: ['third', 'half-small'],
        elementType: 'select',
        elementConfig: {
          options: countries
        },
        label: 'Country',
        value: this.props.country,
        handledByRedux: true
      },
      age: {
        widths: ['third', 'half-small'],
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'e.g. 7'
        },
        label: 'Max Days Old',
        value: '',
      },
      radius: {
        widths: ['third', 'half-small'],
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'e.g. 10',
        },
        label: 'Search Radius',
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
    const { userIp, userAgent, getUserIp, getUserAgent } = this.props;

    if(!userIp) {
      getUserIp();
    }

    if(!userAgent) {
      getUserAgent();
    }
  }

  componentDidUpdate = () => {
    const { location, country } = this.props;

    if(this.state.form.location.value !== location) {
      forms.formElementChangedNoEvent(this, 'location', location);
    }

    if(this.state.form.country.value !== country) {
      forms.formElementChangedNoEvent(this, 'country', country);
    }
  }

  render() {
    const { isAuthenticated, userIp, userAgent, loading, geolocateLoading, location, country, updateReduxHandledFormElement } = this.props;

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
                hasGeolocateButton={formElement.config.hasGeolocateButton}
                label={formElement.config.label}
                value={formElement.config.value}
                geolocateLoading={geolocateLoading}
                geolocate={(event) => forms.geolocateClick(this, event)}
                location={location}
                country={country}
                handledByRedux={formElement.config.handledByRedux}
                updateReduxHandledFormElement={(event) => updateReduxHandledFormElement(formElement.id, event.target.value)}
                changed={(event) => forms.formElementChanged(this, event, formElement.id)}
              />
            )
          })}
          <div class="form__footer">
            <Button type="submit" loading={loading} disabled={!userAgent && !userIp}>Search</Button>
            {isAuthenticated && (
              <LinkButton additionalClasses="form__save">Save Search</LinkButton>
            )}
          </div>
        </form>
        {isAuthenticated && (
          <>
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
    geolocateLoading: state.geolocate.loading,
    location: state.general.location,
    country: state.general.country,
    loading: state.search.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserIp: () => dispatch(actions.getUserIp()),
    getUserAgent: () => dispatch(actions.getUserAgent()),
    geolocateLatLng: () => dispatch(actions.geolocateLatLng()),
    updateReduxHandledFormElement: (formElementName, value) => dispatch(actions.updateReduxHandledFormElement(formElementName, value)),
    search: (userAgent, userIp, query, location, country, radius, jobType, age) => dispatch(actions.search(userAgent, userIp, query, location, country, radius, jobType, age))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
