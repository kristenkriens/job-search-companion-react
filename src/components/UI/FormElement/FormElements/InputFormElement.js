import React from "react";

export const InputFormElement = ({
 id,
 elementConfig,
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
