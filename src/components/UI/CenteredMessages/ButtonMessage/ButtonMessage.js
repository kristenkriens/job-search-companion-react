import React from 'react';
import { Link } from 'react-router-dom';

const ButtonMessage = (props) => {
  const { message, buttonLink, buttonText } = props;

  return (
    <div className="absolute-center">
      <div className="h3">{message}</div>
      <Link to={buttonLink} className="button">{buttonText}</Link>
    </div>
  )
}

export default ButtonMessage;
