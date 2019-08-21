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

// Here, the lookup in the dictionary object will either return the correct
// form element component, or because the key is not found in the object, return
// `undefined`, which is falsy. In that case, the conditional "OR" operator will
// choose the truthy value on the right, providing the default.
const chooseFormElementComponent = (elementType) =>
  formElementsDictionary[elementType] || DefaultFormElement;

const getErrorMessage = (error, id) => {
  const normalizedError = normalizeErrorString(error);

  return normalizedError.toLowerCase().indexOf(id) !== -1
    ? normalizedError
    : null;
};

const shouldShowLabel = (elementType) =>
  !['radio', 'file'].includes(elementType);
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

  const addWidthClassesReducer = (finalClasses, width) =>
    `form__element--${width} ${finalClasses}`;
  // Here, we don't need to truth-check `widths`, as the `.reduce` sets a default
  const widthClasses = widths.reduce(addWidthClassesReducer, '');

  const labelOrLegendProps = _pick(
    ['elementType', 'hiddenLabel', 'id', 'label'],
    props
  );
  const formElementProps = _pick(
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
    ],
    props
  );

  return (
    <div
      className={`form__element ${
        elementError ? 'form__element--error' : ''
      } ${widthClasses}`}
    >
      <LabelOrLegend {...labelOrLegendProps} />
      <div
        className={`form__element-inner form__element-inner--${elementType}`}
      >
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
