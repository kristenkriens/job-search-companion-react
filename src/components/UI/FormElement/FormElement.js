import React from 'react';
import _pick from 'lodash/pick';

import {
  RadioFormElement,
  DefaultFormElement,
  FileFormElement,
  InputFormElement,
  TextareaFormElement,
  SelectFormElement
} from './FormElements';

import GeolocateButton from '../Button/GeolocateButton/GeolocateButton';

import { normalizeErrorString } from '../../../shared/utilities';

const formElementsDictionary = {
  input: InputFormElement,
  textarea: TextareaFormElement,
  select: SelectFormElement,
  radio: RadioFormElement,
  file: FileFormElement
};

const chooseFormElementComponent = (elementType) => formElementsDictionary[elementType] || DefaultFormElement;

const getErrorMessage = (error, id) => {
  if(error && id) {
    const normalizedError = normalizeErrorString(error);

    return normalizedError.toLowerCase().indexOf(id) !== -1
      ? normalizedError
      : null;
  }
};

const shouldShowLabel = (elementType) => !['radio', 'file'].includes(elementType);

const LabelOrLegend = ({ id, label, hiddenLabel, elementType }) => (
  <>
    {elementType === 'radio' && (
      <legend className={hiddenLabel ? 'accessible' : ''}>
        {hiddenLabel ? hiddenLabel : label}
      </legend>
    )}
    {shouldShowLabel(elementType) && (
      <label htmlFor={id} className={hiddenLabel ? 'accessible' : ''}>
        {hiddenLabel ? hiddenLabel : label}
      </label>
    )}
  </>
);

const FormElement = (props) => {
  const {
    id,
    widths,
    hasGeolocateButton,
    elementType,
    error,
    geolocateLoading,
    geolocate
  } = props;

  const FormElementComponent = chooseFormElementComponent(elementType);

  const elementError = getErrorMessage(error, id);

  const widthClasses = widths && widths.reduce((finalClasses, width) => {
    return `form__element--${width} ${finalClasses}`;
  }, '');

  const labelOrLegendProps = _pick(
    props,
    ['elementType', 'hiddenLabel', 'id', 'label']
  );

  const formElementProps = _pick(
    props,
    [
      'id',
      'elementConfig',
      'hasGeolocateButton',
      'value',
      'changed',
      'country',
      'label',
      'fileChanged',
      'location'
    ]
  );

  return (
    <div className={`form__element ${elementError ? 'form__element--error' : ''} ${widthClasses}`}>
      <LabelOrLegend {...labelOrLegendProps} />
      <div className={`form__element-inner form__element-inner--${elementType}`}>
        <FormElementComponent {...formElementProps} />
        {hasGeolocateButton && (
          <GeolocateButton loading={geolocateLoading} geolocate={geolocate} />
        )}
      </div>
      {elementError && (
        <div className="form__element-message">{elementError}</div>
      )}
    </div>
  );
};

export default FormElement;
