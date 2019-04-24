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
        value: this.props.query
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
        value: this.props.location
      },
      country: {
        widths: ['third', 'half-small'],
        elementType: 'select',
        elementConfig: {
          options: countries
        },
        label: 'Country',
        value: this.props.country
      },
      age: {
        widths: ['third', 'half-small'],
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'e.g. 7'
        },
        label: 'Max Days Old',
        value: this.props.age,
      },
      radius: {
        widths: ['third', 'half-small'],
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'e.g. 10',
        },
        label: 'Search Radius',
        moreInfo: 'Units are local to the country.',
        value: this.props.radius
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
        value: this.props.jobType
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
    const formElementsArray = forms.createFormElementsArray(this.state.form);

    formElementsArray.map((formElement) => {
      if(this.state.form[formElement.id].value !== this.props[formElement.id]) {
        return forms.formElementReduxChanged(this, formElement.id, this.props[formElement.id]);
      } else {
        return false;
      }
    })
  }

  clear = (event) => {
    event.preventDefault();

    this.props.searchClear();
  }


  render() {
    const { isAuthenticated, userIp, userAgent, loading, geolocateLoading, location, country, searchFormUpdateElement, toggleAndSetActiveModalAndMessage } = this.props;

    const formElementsArray = forms.createFormElementsArray(this.state.form);

    return (
      <>
        <h1 className="accessible">Search</h1>
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
                moreInfo={formElement.config.moreInfo}
                toggleAndSetActiveModalAndMessage={toggleAndSetActiveModalAndMessage}
                geolocateLoading={geolocateLoading}
                geolocate={(event) => forms.geolocateClick(this, event)}
                location={location}
                country={country}
                changed={(event) => {
                  searchFormUpdateElement(formElement.id, event.target.value);
                  forms.formElementReduxChanged(this, formElement.id, event.target.value);
                }}
              />
            )
          })}
          <div className="form__footer">
            <Button type="submit" loading={loading} disabled={!userAgent && !userIp}>Search</Button>
            <LinkButton click={(event) => this.clear(event)}>Clear</LinkButton>
            {isAuthenticated && (
              <LinkButton>Save</LinkButton>
            )}
          </div>
        </form>
        {isAuthenticated && (
          <>
            <div className="saved-searches">
              <h3>Saved Searches</h3>
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
    loading: state.search.loading,
    location: state.search.location,
    query: state.search.query,
    age: state.search.age,
    radius: state.search.radius,
    jobType: state.search.jobType,
    country: state.search.country
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserIp: () => dispatch(actions.getUserIp()),
    getUserAgent: () => dispatch(actions.getUserAgent()),
    geolocateLatLng: () => dispatch(actions.geolocateLatLng()),
    toggleAndSetActiveModalAndMessage: (activeModal, message) => dispatch(actions.toggleAndSetActiveModalAndMessage(activeModal, message)),
    searchFormUpdateElement: (formElementName, value) => dispatch(actions.searchFormUpdateElement(formElementName, value)),
    search: (userAgent, userIp, query, location, country, radius, jobType, age) => dispatch(actions.search(userAgent, userIp, query, location, country, radius, jobType, age)),
    searchClear: () => dispatch(actions.searchClear())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
