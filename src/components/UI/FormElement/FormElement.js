import React from 'react';

const FormElement = (props) => {
  const { label, elementConfig, elementType, value, error, shouldValidate, touched, changed, hiddenLabel } = props;

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

  return (
    <div className="form__element">
      <label className={hiddenLabel ? 'accessible' : ''}>{label}</label>
      {formElement}
      {error && shouldValidate && touched && (
        <div>Please enter a valid value</div>
      )}
    </div>
  )
}

export default FormElement;
