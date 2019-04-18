import React from 'react';

import Button from '../Button/Button';

import * as forms from '../../../shared/forms';

const FormElement = (props) => {
  const { id, widths, label, hiddenLabel, elementConfig, elementType, value, error, shouldValidate, changed } = props;

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
                <input type={elementConfig.type} id={choice.id} value={choice.config.value} name={'name'} className="accessible" checked={choice.config.value === value} onChange={changed} />
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

  const valid = shouldValidate && !error;

  let widthClasses = '';
  if(widths) {
    widths.forEach((width) => {
      widthClasses += `form__element--${width} `;
    });
  }

  const isCheckboxOrRadio = elementType === 'checkboxRadio';

  let extras = '';
  if(elementConfig.hasGeolocate) {
    extras = (
      <Button additionalClasses="extras extras--square">
        <i className="fa fa-location-arrow" aria-hidden="true"></i>
        <span className="accessible">Get Geolocation</span>
      </Button>
    )
  } else if(elementConfig.hasUnits) {
    extras = (
      <div className="extras extras--select">
        <select id="radiusUnits">
          <option defaultValue value="km">km</option>
          <option value="mi">mi</option>
        </select>
      </div>
    )
  }

  return (
    <div className={`form__element ${valid ? 'form__element--valid' : ''} ${widthClasses}`}>
      {isCheckboxOrRadio ? (
        <legend className={hiddenLabel ? 'accessible' : ''}>{hiddenLabel ? hiddenLabel : label}</legend>
      ) : (
        <label htmlFor={id} className={hiddenLabel ? 'accessible' : ''}>{hiddenLabel ? hiddenLabel : label}</label>
      )}
      {formElement}
      {extras}
    </div>
  )
}

export default FormElement;
