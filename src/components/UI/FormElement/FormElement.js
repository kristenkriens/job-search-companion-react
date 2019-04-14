import React from 'react';

const FormElement = (props) => {
  const { label, elementConfig, elementType, value, error, shouldValidate, changed, hiddenLabel } = props;

  let formElement = null;
  switch(elementType) {
    case ('input'):
      formElement = <input {...elementConfig} value={value} onChange={changed} />;
      break;
    case ('textarea'):
      formElement = <textarea {...elementConfig} value={value} onChange={changed} />;
      break;
    case ('select'):
      formElement = (
        <select value={value} onChange={changed}>
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
    default:
      formElement = <input {...elementConfig} value={value} onChange={changed} />;
  }

  const valid = shouldValidate && !error;

  return (
    <div className={`form__element ${valid ? 'form__element--valid' : ''}`}>
      <label className={hiddenLabel ? 'accessible' : ''}>{label}</label>
      {formElement}
    </div>
  )
}

export default FormElement;
