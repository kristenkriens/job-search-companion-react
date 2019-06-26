import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormElement from '../../FormElement/FormElement';
import Button from '../../Button/Button';

import * as forms from '../../../../shared/forms';
import * as actions from '../../../../store/actions/index';

class ResetPassword extends Component {
  state = {
    form: {
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: ''
        },
        label: 'New Password',
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false
      }
    }
  }

  submitPasswordResetForm = (event) => {
    event.preventDefault();

    this.props.authResetPassword(this.props.code, this.state.form.password.value);
  }

  render() {
    const { loading, error } = this.props;

    const formElementsArray = forms.createFormElementsArray(this.state.form);

    return (
      <>
        <h2>Reset Password</h2>
        <form onSubmit={(event) => this.submitPasswordResetForm(event)} className="form">
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
            <Button type="submit" loading={loading} additionalClasses="modal__submit" disabled={forms.checkSubmitButtonDisabled(this.state.form)}>Update</Button>
          </div>
        </form>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    code: state.auth.oobCode,
    router: state.router
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authResetPassword: (email) => dispatch(actions.authResetPassword(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
