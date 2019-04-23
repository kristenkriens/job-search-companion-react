import React, { Component } from 'react';

const Error = (props) => {
  const { errorMessage } = props;

  return (
    <>
      <h2>Error</h2>
      <p>{errorMessage}</p>
    </>
  )
}

export default Error;
