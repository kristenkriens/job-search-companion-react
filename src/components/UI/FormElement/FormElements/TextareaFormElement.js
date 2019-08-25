import React from "react";

export const TextareaFormElement = ({ id, elementConfig, value, changed }) => (
  <textarea id={id} {...elementConfig} value={value} onChange={changed} />
);
