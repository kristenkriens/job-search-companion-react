import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = (props) => {
  const { breadcrumb } = props;

  return (
    <div className="topbar__breadcrumb">
      <span className="topbar__breadcrumb-group">{breadcrumb.group}</span>
      <Link to={breadcrumb.current.link} className="topbar__breadcrumb-current">{breadcrumb.current.title}</Link>
    </div>
  )
}

export default Breadcrumb;
