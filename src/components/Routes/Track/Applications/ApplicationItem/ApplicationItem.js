import React from 'react';

const ApplicationItem = (props) => {
  const { item } = props;
  const { jobkey, jobtitle, company, city, url, applicationDate } = item;

  const date = () => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const date = new Date(applicationDate);

    const year = date.getFullYear();

    const month = months[date.getMonth()];

    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  }

  return (
    <tr>
      <td><i className="fa fa-sort" aria-hidden="true"></i></td>
      <td>{jobtitle}</td>
      <td>{company}</td>
      <td>{city}</td>
      <td><a href={url} target="_blank" rel="noopener noreferrer"><i className="fa fa-link" aria-hidden="true"></i><span className="accessible">Link to job posting for {jobtitle}</span></a></td>
      <td>{date()}</td>
      <td>
        <select id={`result-${jobkey}`} value="no-response">
          <option value="interview">Interview</option>
          <option value="accepted-offer">Accepted offer</option>
          <option value="declined-offer">Declined offer</option>
          <option value="no-response">No response</option>
          <option value="no-offer">No offer</option>
          <option value="declined">Declined</option>
          <option value="other">Other</option>
        </select>
      </td>
    </tr>
  )
}

export default ApplicationItem;
