import React from 'react';

const Backdrop = (props) => {
  const { show, close } = props;

  return (
    <>
      {show ? (
        <div className="backdrop" onClick={close}></div>
      ) : (
        null
      )}
    </>
  )
}

export default Backdrop;
