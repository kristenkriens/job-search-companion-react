import React from 'react';

import GeolocateButton from '../Button/GeolocateButton/GeolocateButton';

import BlankUser from '../../../assets/images/blank-user.gif';

import { normalizeErrorString } from '../../../shared/utilities';

const FormElement = (props) => {
  const { id, widths, label, hiddenLabel, elementConfig, hasGeolocateButton, elementType, value, error, geolocateLoading, geolocate, location, country, changed, fileChanged } = props;

  let formElement = null;
  switch(elementType) {
    case ('input'):
      formElement = <input id={id} {...elementConfig} value={hasGeolocateButton && location ? location : value} onChange={changed} />;
      break;
    case ('textarea'):
      formElement = <textarea id={id} {...elementConfig} value={value} onChange={changed} />;
      break;
    case ('select'):
      formElement = (
        <select id={id} value={country ? country : value} onChange={changed}>
          {elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value} disabled={option.disabled}>
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
    case ('file'):
      const isUploaded = value !== BlankUser;
      const isUpdated = typeof(value) !== 'string';

      const binaryData = [];
      binaryData.push(value);
      const url = URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}));

      formElement = (
        <>
          <label htmlFor={id} style={{backgroundImage: `url(${isUpdated ? url : value})`}}>
            <div>
              <i className="fa fa-camera" aria-hidden="true"></i>
              {isUploaded ? (
                <div className="accessible">Change {label}</div>
              ) : (
                <div>Upload {label}</div>
              )}
            </div>
          </label>
          <input id={id} type="file" {...elementConfig} onChange={fileChanged} className="accessible" />
        </>
      );
      break;
    default:
      formElement = <input id={id} {...elementConfig} value={value} onChange={changed} />;
  }

  let elementError = null;
  if(error) {
    let errorMessage = normalizeErrorString(error);

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
        <>
          {elementType !== 'file' && (
            <label htmlFor={id} className={hiddenLabel ? 'accessible' : ''}>{hiddenLabel ? hiddenLabel : label}</label>
          )}
        </>
      )}
      <div className={`form__element-inner form__element-inner--${elementType}`}>
        {formElement}
        {hasGeolocateButton && <GeolocateButton loading={geolocateLoading} geolocate={geolocate} />}
      </div>
      {elementError && (
        <div className="form__element-message">{elementError}</div>
      )}
    </div>
  )
}

export default FormElement;
