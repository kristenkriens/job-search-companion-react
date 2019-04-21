import React from 'react';

import Geocode from '../Button/Geocode/Geocode';

import { normalizeErrorString } from '../../../shared/utilities';

const FormElement = (props) => {
  const { id, widths, label, hiddenLabel, elementConfig, hasGeocode, elementType, value, error, geocodeLoading, geocodeDisabled, geocode, location, changed } = props;

  let formElement = null;
  switch(elementType) {
    case ('input'):
      formElement = <input id={id} {...elementConfig} value={hasGeocode && location ? location : value} onChange={changed} />;
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
    case ('radio'):
      formElement = (
        <ul>
          {elementConfig.choices.map((choice) => {
            return (
              <li key={choice.value}>
                <input type="radio" id={choice.value} value={choice.value} name={id} className="accessible" checked={choice.value === value} onChange={changed} />
                <label htmlFor={choice.value}>{choice.label}</label>
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
    let errorMessage = normalizeErrorString(error.message);

    if(errorMessage.toLowerCase().indexOf(id) !== -1) {
      elementError = errorMessage;
    }
  }

  let widthClasses = '';
  if(widths) {
    widths.forEach((width) => {
      widthClasses += `form__element--${width} `;
    });
  }

  return (
    <div className={`form__element ${elementError ? 'form__element--error' : ''} ${widthClasses}`}>
      {elementType === 'radio' ? (
        <legend className={hiddenLabel ? 'accessible' : ''}>{hiddenLabel ? hiddenLabel : label}</legend>
      ) : (
        <label htmlFor={id} className={hiddenLabel ? 'accessible' : ''}>{hiddenLabel ? hiddenLabel : label}</label>
      )}
      <div className="form__element-inner">
        {formElement}
        {hasGeocode && <Geocode loading={geocodeLoading} disabled={geocodeDisabled} geocode={geocode} />}
      </div>
      {elementError && (
        <div className="form__element-message">{elementError}</div>
      )}
    </div>
  )
}

export default FormElement;
