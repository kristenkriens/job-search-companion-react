import React from 'react';

import Button from '../Button/Button';

import { normalizeErrorString } from '../../../shared/utilities';

const FormElement = (props) => {
  const { id, widths, label, hiddenLabel, elementConfig, hasGeolocate, elementType, value, error, geolocateLoading, geolocate, changed } = props;

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

  let geolocateElement = '';
  if(hasGeolocate) {
    geolocateElement = (
      <Button additionalClasses="geolocate" click={geolocate}>
        {geolocateLoading ? (
          <>
            <i className="fa fa-spinner fa-pulse fa-fw"></i>
            <span className="accessible">Loading...</span>
          </>
        ) : (
          <>
            <i className="fa fa-location-arrow" aria-hidden="true"></i>
            <span className="accessible">Get Geolocation</span>
          </>
        )}
      </Button>
    )
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
        {geolocateElement}
      </div>
      {elementError && (
        <div className="form__element-message">{elementError}</div>
      )}
    </div>
  )
}

export default FormElement;
