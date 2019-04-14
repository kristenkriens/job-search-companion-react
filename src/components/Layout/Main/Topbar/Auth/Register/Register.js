import React from 'react';

import Button from '../../../../../UI/Button/Button';

const Register = (props) => {
  const { setActiveModal } = props;

  return (
    <>
      <h2>Create Account</h2>
      <form>
        <div className="form__element">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="John Doe" />
        </div>
        <div className="form__element">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="e.g. fake-email@gmail.com" />
        </div>
        <div className="form__element">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="form__element">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" />
        </div>
        <Button type="submit" additionalClasses="modal__submit" disabled>Submit</Button>
        <button className="modal__link" onClick={() => setActiveModal('login')}>Already have an account? Log In</button>
      </form>
    </>
  )
}

export default Register;
