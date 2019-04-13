import React from 'react';

import Button from '../../../../../UI/Button/Button';

const Login = (props) => (
  <form className="modal__form">
    <div className="form__element">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" placeholder="e.g. fake-email@gmail.com" />
    </div>
    <div className="form__element">
      <label htmlFor="password">Password</label>
      <input type="password" id="password" />
    </div>
    <Button additionalClasses="modal__submit" disabled>Submit</Button>
    <button className="modal__link">New user? Create an account</button>
  </form>
)

export default Login;
