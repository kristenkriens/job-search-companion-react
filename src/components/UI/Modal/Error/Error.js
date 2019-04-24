import React from 'react';

const Error = (props) => {
  const { message } = props;

  return (
    <>
      <h2>Error</h2>
      <div>{message}</div>
    </>
  )
}

export default Error;
