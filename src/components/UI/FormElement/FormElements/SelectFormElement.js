import React from 'react';

export const SelectFormElement = ({
  id,
  value,
  country,
  changed,
  elementConfig
}) => (
  <select id={id} value={country ? country : value} onChange={changed}>
    {elementConfig.options.map((option) => {
      return (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.displayValue}
        </option>
      );
    })}
  </select>
);
