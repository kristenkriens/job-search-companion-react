import React from 'react';

const LoadingMessage = (props) => {
  const { message } = props;

  return (
    <div className="absolute-center">
      <div className="h3">{message}</div>
      <i className="fa fa-spinner fa-pulse fa-fw fa-2x"></i>
    </div>
  )
}

export default LoadingMessage;
