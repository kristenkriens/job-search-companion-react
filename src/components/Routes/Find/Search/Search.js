import React, { Component } from 'react';

import FormElement from '../../../UI/FormElement/FormElement';
import Button from '../../../UI/Button/Button';

import * as forms from '../../../../shared/forms';

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
        extras: {
          hasGeolocate: true
        },
        label: 'Location',
        value: '',
      },
      postAge: {
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
        extras: {
          hasUnits: true
        },
        label: 'Search Radius',
        value: '',
      },
      jobType: {
        elementType: 'checkboxRadio',
        elementConfig: {
          type: 'checkbox',
          choices: {
            noPreference: {
              label: 'No Preference',
              value: 'nopreference',
              checked: true
            },
            fullTime: {
              label: 'Full Time',
              value: 'fulltime',
              checked: false
            },
            partTime: {
              label: 'Part Time',
              value: 'parttime',
              checked: false
            },
            contract: {
              label: 'Contract',
              value: 'contract',
              checked: false
            },
            internship: {
              label: 'Internship',
              value: 'internship',
              checked: false
            },
            temporary: {
              label: 'Temporary',
              value: 'temporary',
              checked: false
            }
          }
        },
        label: 'Job Type'
      }
    }
  }

  render() {
    const { isAuthenticated } = this.props;

    const formElementsArray = forms.createFormElementsArray(this.state.form);

    return (
      <>
        <form onSubmit={(event) => forms.submitSearchForm(this, event)} className="form">
          {formElementsArray.map((formElement) => {
            return (
              <FormElement
                key={formElement.id}
                id={formElement.id}
                widths={formElement.config.widths}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                extras={formElement.config.extras}
                label={formElement.config.label}
                value={formElement.config.value}
                changed={(event) => forms.basicFormElementChanged(this, event, formElement.id)}
                that={this}
                checkboxRadioFormElementChanged={forms.checkboxRadioFormElementChanged}
              />
            )
          })}
          <Button type="submit">Search</Button>
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

export default Search;
