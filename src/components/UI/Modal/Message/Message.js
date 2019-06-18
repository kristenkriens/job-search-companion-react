import React from 'react';

const Message = (props) => {
  const { type, message } = props;

  return (
    <>
      <h2>{type === 'error' ? 'Error' : 'Success'}</h2>
      <div>{message}</div>
    </>
  )
}

export default Message;
