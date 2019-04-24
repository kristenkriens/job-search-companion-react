import React from 'react';

import './Breadcrumb.scss';

const Breadcrumb = (props) => {
  const { breadcrumb } = props;

  return (
    <div className="topbar__breadcrumb">
      {breadcrumb.group && (
        <span className="topbar__breadcrumb-group">{breadcrumb.group}</span>
      )}
      <span className="topbar__breadcrumb-current"><span className="accessible">Current:</span>{breadcrumb.current}</span>
    </div>
  )
}

export default Breadcrumb;
