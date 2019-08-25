import React from "react";

export const DefaultFormElement = ({ id, elementConfig, value, changed }) => (
  <input id={id} {...elementConfig} value={value} onChange={changed} />
);
