import React from 'react';

import Button from '../Button/Button';

import * as forms from '../../../shared/forms';

const FormElement = (props) => {
  const { id, widths, label, hiddenLabel, elementConfig, extras, elementType, value, error, changed, that, checkboxRadioFormElementChanged } = props;

  let formElement = null;
  switch(elementType) {
    case ('input'):
      formElement = <input id={id} {...elementConfig} value={value} onChange={changed} />;
      break;
    case ('textarea'):
      formElement = <textarea id={id} {...elementConfig} value={value} onChange={changed} />;
      break;
    case ('select'):
      formElement = (
        <select id={id} value={value} onChange={changed}>
          {elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            )
          })}
        </select>
      );
      break;
    case ('checkboxRadio'):
      const choices = forms.createFormElementsArray(elementConfig.choices);

      formElement = (
        <ul>
          {choices.map((choice) => {
            return (
              <li key={choice.id}>
                <input type={elementConfig.type} id={choice.id} value={choice.config.value} name={'name'} className="accessible" checked={choice.config.checked} onChange={(event) => {
                  checkboxRadioFormElementChanged(that, event, id, choice.id)}
                } />
                <label htmlFor={choice.id}>{choice.config.label}</label>
              </li>
            )
          })}
        </ul>
      );
      break;
    default:
      formElement = <input id={id} {...elementConfig} value={value} onChange={changed} />;
  }

  let elementError = null;
  if(error) {
    let errorMessage = forms.normalizeErrorString(error.message);

    if(errorMessage.indexOf(id) !== -1) {
      elementError = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
    }
  }

  let widthClasses = '';
  if(widths) {
    widths.forEach((width) => {
      widthClasses += `form__element--${width} `;
    });
  }

  const isCheckboxOrRadio = elementType === 'checkboxRadio';

  let extraElement = '';
  if(extras) {
    if(extras.hasGeolocate) {
      extraElement = (
        <Button additionalClasses="extras extras--square">
          <i className="fa fa-location-arrow" aria-hidden="true"></i>
          <span className="accessible">Get Geolocation</span>
        </Button>
      )
    } else if(extras.hasUnits) {
      extraElement = (
        <div className="extras extras--select">
          <select id="radiusUnits">
            <option defaultValue value="km">km</option>
            <option value="mi">mi</option>
          </select>
        </div>
      )
    }
  }

  return (
    <div className={`form__element ${elementError ? 'form__element--error' : ''} ${widthClasses}`}>
      {isCheckboxOrRadio ? (
        <legend className={hiddenLabel ? 'accessible' : ''}>{hiddenLabel ? hiddenLabel : label}</legend>
      ) : (
        <label htmlFor={id} className={hiddenLabel ? 'accessible' : ''}>{hiddenLabel ? hiddenLabel : label}</label>
      )}
      <div className="form__element-inner">
        {formElement}
        {extraElement}
      </div>
      {elementError && (
        <div className="form__element-message">{elementError}</div>
      )}
    </div>
  )
}

export default FormElement;
