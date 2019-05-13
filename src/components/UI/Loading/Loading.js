import React from 'react';

const Loading = (props) => {
  const { loading, children } = props;

  return (
    <>
      {loading ? (
        <>
          <i className="fa fa-spinner fa-pulse fa-fw"></i>
          <span className="accessible">Loading...</span>
        </>
      ) : (
        children
      )}
    </>
  )
}

export default Loading;
