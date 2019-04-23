import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormElement from '../../FormElement/FormElement';
import Button from '../../Button/Button';
import LinkButton from '../../Button/LinkButton/LinkButton';

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
      }
    },
    isRegister: true
  }

  render() {
    const { setActiveModal, loading, error } = this.props;

    const formElementsArray = forms.createFormElementsArray(this.state.form);

    return (
      <>
        <h2>Create Account</h2>
        <form onSubmit={(event) => forms.submitAuthForm(this, event)} className="form">
          {formElementsArray.map((formElement) => {
            return (
              <FormElement
                key={formElement.id}
                id={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                label={formElement.config.label}
                value={formElement.config.value}
                error={error}
                changed={(event) => forms.formElementChanged(this, event, formElement.id)}
              />
            )
          })}
          <div className="form__footer form__footer--center">
            <Button type="submit" loading={loading} additionalClasses="modal__submit" disabled={forms.checkSubmitButtonDisabled(this.state.form)}>Submit</Button>
          </div>
        </form>
        <LinkButton additionalClasses="modal__link" click={() => setActiveModal('login')}>Already have an account? Log In</LinkButton>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
