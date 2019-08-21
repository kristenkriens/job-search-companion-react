import React from 'react';

export const InputFormElement = ({
  id,
  elementConfig,
  location,
  hasGeolocateButton,
  value,
  changed
}) => (
  <input
    id={id}
    {...elementConfig}
    value={hasGeolocateButton && location ? location : value}
    onChange={changed}
  />
);
