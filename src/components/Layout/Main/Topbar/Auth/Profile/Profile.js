import React from 'react';

import Button from '../../../../../UI/Button/Button';

const Profile = (props) => (
  <form className="modal__form">
    <div className="form__element">
      <input type="file" id="image" accept="image/*" className="accessible" />
      <label htmlFor="image">
        <img src="dist/images/blank-user.gif" alt="Profile" />
        <i className="fa fa-camera" aria-hidden="true"></i>
      </label>
    </div>
    <div className="form__element">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value="Anonymous" />
    </div>
    <div className="form__element">
      <label htmlFor="skills">Skills</label>
      <input type="text" id="skills" placeholder="Please enter 1 skill at a time" />
      <button type="button" className="units units--square add-skills">
        <i className="fa fa-plus" aria-hidden="true"></i>
        <span className="accessible">Add Skill</span>
      </button>
    </div>
    <ul className="modal__skills modal__skills--hidden"></ul>
    <Button additionalClasses="modal__submit">Submit</Button>
    <button className="modal__link">Skip</button>
  </form>
)

export default Profile;
