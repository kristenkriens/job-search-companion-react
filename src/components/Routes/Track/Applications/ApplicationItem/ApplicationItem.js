import React from 'react';

import IconButton from '../../../../UI/Button/IconButton/IconButton';

import { convertDate } from '../../../../../shared/utilities';

const ApplicationItem = (props) => {
  const { item, dragStart, dragEnd, dragOver, changeResult, remove } = props;
  const { jobkey, jobtitle, company, city, url, applicationDate, result } = item;

  const acceptedClass = 'colour green';
  const declinedClass = 'colour red';

  const colourClasses = {
    'accepted-offer': acceptedClass,
    'declined': declinedClass,
    'declined-offer': declinedClass
  };

  const colourClass = colourClasses[result];

  return (
    <tr onDragOver={dragOver} className={colourClass}>
      <td draggable onDragStart={dragStart} onDragEnd={dragEnd}><i className="fa fa-sort" aria-hidden="true"></i><span className="accessible">Drag to change order</span></td>
      <td>{jobtitle}</td>
      <td>{company}</td>
      <td>{city}</td>
      <td><a href={url} target="_blank" rel="noopener noreferrer"><i className="fa fa-link" aria-hidden="true"></i><span className="accessible">Link to job posting for {jobtitle}</span></a></td>
      <td>{convertDate(applicationDate)}</td>
      <td>
        <select id={`result-${jobkey}`} value={result} onChange={changeResult}>
          <option value="" disabled></option>
          <option value="interview">Interview</option>
          <option value="accepted-offer">Accepted offer</option>
          <option value="declined-offer">Declined offer</option>
          <option value="no-response">No response</option>
          <option value="no-offer">No offer</option>
          <option value="declined">Declined</option>
          <option value="other">Other</option>
        </select>
      </td>
      <td><IconButton click={remove}><i className="fa fa-trash" aria-hidden="true"></i></IconButton></td>
    </tr>
  )
}

export default ApplicationItem;
