import React, { Component } from 'react';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';
import _pick from 'lodash/pick';

import FormElement from '../../../UI/FormElement/FormElement';
import Button from '../../../UI/Button/Button';
import LinkButton from '../../../UI/Button/LinkButton/LinkButton';
import SavedSearches from './SavedSearches/SavedSearches';

import './Search.scss';

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
          placeholder: 'e.g. 10 (Default is 25)',
        },
        label: 'Search Radius (km)',
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
    if(this.props.isAuthenticated) {
      this.props.getSavedSearches(this.props.token, this.props.userId);
    }
  }

  count = 0;
  componentDidUpdate = (prevProps) => {
    const formElementsArray = forms.createFormElementsArray(this.state.form);

    formElementsArray.map(({id}) => {
      if(this.state.form[id].value !== this.props[id]) {
        return forms.formElementReduxChanged(this, id, this.props[id]);
      } else {
        return false;
      }
    });

    let equal = false;
    if(this.count > 0) {
      equal = _isEqual(prevProps.savedSearches, this.props.savedSearches);
    }

    if(this.props.isAuthenticated && !equal) {
      this.props.getSavedSearches(this.props.token, this.props.userId);
    }

    this.count++;
  }

  geolocateClick = (event) => {
    event.preventDefault();

    this.props.geolocateLatLng();
  }

  submitSearchForm = (event, userIp, userAgent, limit) => {
    event.preventDefault();

    const formValues = {};
    for(let key in this.state.form) {
      formValues[key] = this.state.form[key].value;
    }

    this.props.searchPaginationChangeDone(0, 1);
    this.props.searchSortByChangeDone('relevance');
    this.props.searchGo({
      userIp,
      userAgent,
      limit,
      sortBy: 'relevance',
      start: 0,
      ...formValues
    });
  }

  clear = (event) => {
    event.preventDefault();

    this.props.searchClear();
  }

  saveSearch = (event) => {
    event.preventDefault();

    const savedSearch = {
      query: this.state.form.query.value,
      location: this.state.form.location.value,
      country: this.state.form.country.value,
      radius: this.state.form.radius.value,
      jobType: this.state.form.jobType.value,
      age: this.state.form.age.value,
      order: Date.now()
    }

    this.props.setSavedSearch(this.props.token, this.props.userId, savedSearch);
  }

  render() {
    const { isAuthenticated, userIp, userAgent, limit, loading, geolocateLoading, location, country, savedSearches, searchFormUpdateElement } = this.props;

    const formElementsArray = forms.createFormElementsArray(this.state.form);
    const formElementConfigPropsToPass = ['widths', 'elementType', 'elementConfig', 'hasGeolocateButton', 'label', 'value'];

    return (
      <>
        <h1 className="accessible">Search</h1>
        <form onSubmit={(event) => this.submitSearchForm(event, userIp, userAgent, limit)} className="form">
          {formElementsArray.map(({id, config}) => {
            return (
              <FormElement
                key={id}
                id={id}
                {..._pick(config, formElementConfigPropsToPass)}
                geolocateLoading={geolocateLoading}
                geolocate={(event) => this.geolocateClick(event)}
                location={location}
                country={country}
                changed={(event) => {
                  searchFormUpdateElement(id, event.target.value);
                  forms.formElementReduxChanged(this, id, event.target.value);

                  if(id === 'country') {
                    forms.countryReduxChangedRadiusLabel(this, event.target.value)
                  }
                }}
              />
            )
          })}
          <div className="form__footer">
            <Button type="submit" loading={loading} disabled={!userIp && !userAgent}>Search</Button>
            <LinkButton click={(event) => this.clear(event)}>Clear</LinkButton>
            {isAuthenticated && (
              <LinkButton click={(event) => this.saveSearch(event)}>Save</LinkButton>
            )}
          </div>
        </form>
        {isAuthenticated && (
          <SavedSearches savedSearches={savedSearches} jobTypes={this.state.form.jobType.elementConfig.choices} />
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    geolocateLoading: state.geolocate.loading,
    loading: state.search.loading,
    location: state.search.location,
    query: state.search.query,
    age: state.search.age,
    radius: state.search.radius,
    jobType: state.search.jobType,
    country: state.search.country,
    limit: state.search.limit,
    sortBy: state.search.sortBy,
    token: state.auth.token,
    userId: state.auth.userId,
    savedSearches: state.savedSearches.savedSearches
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    geolocateLatLng: () => dispatch(actions.geolocateLatLng()),
    searchFormUpdateElement: (formElementName, value) => dispatch(actions.searchFormUpdateElement(formElementName, value)),
    searchGo: (searchCriteria) => dispatch(actions.searchGo(searchCriteria)),
    searchClear: () => dispatch(actions.searchClear()),
    setSavedSearch: (token, userId, savedSearch) => dispatch(actions.setSavedSearch(token, userId, savedSearch)),
    getSavedSearches: (token, userId) => dispatch(actions.getSavedSearches(token, userId)),
    searchPaginationChangeDone: (start, currentPage) => dispatch(actions.searchPaginationChangeDone(start, currentPage)),
    searchSortByChangeDone: (sortBy) => dispatch(actions.searchSortByChangeDone(sortBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
