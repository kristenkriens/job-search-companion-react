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

const chooseFormElement = (elementType, propsToPass) => {
  switch (elementType) {
    case 'input':
      return <InputFormElement {...propsToPass} />;
    case 'textarea':
      return <TextareaFormElement {...propsToPass} />;
    case 'select':
      return <SelectFormElement {...propsToPass} />;
    case 'radio':
      return <RadioFormElement {...propsToPass} />;
    case 'file':
      return <FileFormElement {...propsToPass} />;
    default:
      return <DefaultFormElement {...propsToPass} />;
  }
};

const getErrorMessage = (error) => {
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
    label,
    hiddenLabel,
    hasGeolocateButton,
    elementType,
    error,
    geolocateLoading,
    geolocate
  } = props;
  const propsToPass = _pick(
    [
      'id',
      'elementConfig',
      'hasGeolocateButton',
      'value',
      'changed',
      'country',
      'label',
      'fileChanged'
    ],
    props
  );
  const formElement = chooseFormElement(elementType, propsToPass);

  const elementError = getErrorMessage(error);

  const addWidthClassesReducer = (finalClasses, width) =>
    `form__element--${width} ${finalClasses}`;
  // Here, we don't need to truth-check `widths`, as the `.reduce` sets a default
  const widthClasses = widths.reduce(addWidthClassesReducer, '');

  const labelOrLegendProps = {
    elementType,
    hiddenLabel,
    id,
    label
  };

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
        {formElement}
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
