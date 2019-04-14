import React from 'react';

import Button from '../../../../../UI/Button/Button';

const Login = (props) => {
  const { setActiveModal } = props;

  return (
    <>
      <h2>Log In</h2>
      <form>
        <div className="form__element">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="e.g. fake-email@gmail.com" />
        </div>
        <div className="form__element">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <Button type="submit" additionalClasses="modal__submit" disabled>Submit</Button>
        <button className="modal__link" onClick={() => setActiveModal('register')}>New user? Create an account</button>
      </form>
    </>
  )
}

export default Login;
