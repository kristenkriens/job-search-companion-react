import React from 'react';

const Breadcrumb = (props) => {
  return (
    <div className="topbar__breadcrumb">
      <span className="topbar__breadcrumb-parent">Parent</span>
      <button className="topbar__breadcrumb-current">Current</button>
    </div>
  )
}

export default Breadcrumb;
