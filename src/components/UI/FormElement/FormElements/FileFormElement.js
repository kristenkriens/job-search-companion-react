import React from "react";

import BlankUser from "../../../../assets/images/blank-user.gif";

export const FileFormElement = ({ value, id, label, elementConfig, fileChanged }) => {
  const isUploaded = value !== BlankUser;
  const isUpdated = typeof value !== "string";

  const binaryData = [];
  binaryData.push(value);
  const url = URL.createObjectURL(
    new Blob(binaryData, { type: "application/zip" })
  );

  return (
    <>
      <label
        htmlFor={id}
        style={{ backgroundImage: `url(${isUpdated ? url : value})` }}
      >
        <div>
          <i className="fa fa-camera" aria-hidden="true" />
          {isUploaded ? (
            <div className="accessible">Change {label}</div>
          ) : (
            <div>Upload {label}</div>
          )}
        </div>
      </label>
      <input
        id={id}
        type="file"
        {...elementConfig}
        onChange={fileChanged}
        className="accessible"
      />
    </>
  );
};
