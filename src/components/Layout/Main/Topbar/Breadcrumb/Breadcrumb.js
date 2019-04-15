import React from 'react';

const Breadcrumb = (props) => {
  const { breadcrumb } = props;

  return (
    <div className="topbar__breadcrumb">
      {breadcrumb.group && (
        <span className="topbar__breadcrumb-group">{breadcrumb.group}</span>
      )}
      <span className="topbar__breadcrumb-current">{breadcrumb.current}</span>
    </div>
  )
}

export default Breadcrumb;
