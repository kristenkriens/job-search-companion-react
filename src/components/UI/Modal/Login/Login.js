import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormElement from '../../FormElement/FormElement';
import Button from '../../Button/Button';

import { checkSubmitButtonDisabled, inputChanged, submitForm } from '../../../../shared/utility';
import * as actions from '../../../../store/actions/index';

class Login extends Component {
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
      }
    },
    isRegister: false
  }

  render() {
    const { setActiveModal } = this.props;

    const formElementsArray = [];
    for(let key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key]
      });
    }

    return (
      <>
        <h2>Log In</h2>
        <form onSubmit={(event) => submitForm(this, event)} className="form">
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
                changed={(event) => inputChanged(this, event, formElement.id)}
              />
            )
          })}
          <Button type="submit" additionalClasses="modal__submit" disabled={checkSubmitButtonDisabled(this.state.form)}>Submit</Button>
        </form>
        <button className="modal__link" onClick={() => setActiveModal('register')}>New user? Create an account</button>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  }
}

export default connect(null, mapDispatchToProps)(Login);
