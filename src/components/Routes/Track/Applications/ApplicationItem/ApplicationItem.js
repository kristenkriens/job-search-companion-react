import React from 'react';

import IconButton from '../../../../UI/Button/IconButton/IconButton';

const ApplicationItem = (props) => {
  const { item, dragStart, dragEnd, dragOver, changeResult, remove } = props;
  const { jobkey, jobtitle, company, city, url, applicationDate, result } = item;

  const convertDate = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const date = new Date(applicationDate);

    const year = date.getFullYear();

    const month = months[date.getMonth()];

    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  }

  return (
    <tr onDragOver={dragOver}>
      <td draggable onDragStart={dragStart} onDragEnd={dragEnd}><i className="fa fa-sort" aria-hidden="true"></i></td>
      <td>{jobtitle}</td>
      <td>{company}</td>
      <td>{city}</td>
      <td><a href={url} target="_blank" rel="noopener noreferrer"><i className="fa fa-link" aria-hidden="true"></i><span className="accessible">Link to job posting for {jobtitle}</span></a></td>
      <td>{convertDate()}</td>
      <td>
        <select id={`result-${jobkey}`} value={result ? result : ''} onChange={changeResult}>
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
