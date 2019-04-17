import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormElement from '../../FormElement/FormElement';
import Button from '../../Button/Button';

import * as forms from '../../../../shared/forms';
import * as actions from '../../../../store/actions/index';

class Register extends Component {
  state = {
    form: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'e.g. fake-email@gmail.com'
        },
        label: 'Email',
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: ''
        },
        label: 'Password',
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false
      },
      confirmPassword: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: ''
        },
        label: 'Confirm Password',
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false
      }
    },
    isRegister: true
  }

  render() {
    const { setOpenModal } = this.props;

    const formElementsArray = forms.createFormElementsArray(this.state.form);

    return (
      <>
        <h2>Create Account</h2>
        <form onSubmit={(event) => forms.submitForm(this, event)} className="form">
          {formElementsArray.map((formElement) => {
            return (
              <FormElement
                key={formElement.id}
                id={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                label={formElement.config.label}
                value={formElement.config.value}
                error={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                changed={(event) => forms.inputChanged(this, event, formElement.id)}
              />
            )
          })}
          <Button type="submit" additionalClasses="modal__submit" disabled={forms.checkSubmitButtonDisabled(this.state.form)}>Submit</Button>
        </form>
        <button className="modal__link" onClick={() => setOpenModal('login')}>Already have an account? Log In</button>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  }
}

export default connect(null, mapDispatchToProps)(Register);
