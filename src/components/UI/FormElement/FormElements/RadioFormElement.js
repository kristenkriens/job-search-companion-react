import React from "react";

export const RadioFormElement = ({ elementConfig, id, value, changed }) => (
  <ul>
    {elementConfig.choices.map(choice => {
      return (
        <li key={choice.value}>
          <input
            type="radio"
            id={choice.value}
            value={choice.value}
            name={id}
            className="accessible"
            checked={choice.value === value}
            onChange={changed}
          />
          <label htmlFor={choice.value}>{choice.label}</label>
        </li>
      );
    })}
  </ul>
);
