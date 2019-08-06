import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormElement from '../../FormElement/FormElement';
import Button from '../../Button/Button';

import * as forms from '../../../../shared/forms';
import * as actions from '../../../../store/actions/index';

class ForgotPassword extends Component {
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
      }
    }
  }

  submitForm = (event) => {
    event.preventDefault();

    this.props.authForgotPassword(this.state.form.email.value);
  }

  render() {
    const { loading, error } = this.props;

    const formElementsArray = forms.createFormElementsArray(this.state.form);

    return (
      <>
        <h2>Reset Password</h2>
        <form onSubmit={(event) => this.submitForm(event)} className="form">
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
            <Button type="submit" loading={loading} additionalClasses="modal__submit" disabled={forms.checkSubmitButtonDisabled(this.state.form)}>Reset</Button>
          </div>
        </form>
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
    authForgotPassword: (email) => dispatch(actions.authForgotPassword(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
