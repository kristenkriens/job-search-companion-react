import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormElement from '../../FormElement/FormElement';
import Button from '../../Button/Button';

import * as forms from '../../../../shared/forms';
import * as actions from '../../../../store/actions/index';

class ResetUpdatePassword extends Component {
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

  submitPasswordResetUpdateForm = (event, isReset) => {
    event.preventDefault();

    if(isReset) {
      this.props.authResetPassword(this.props.code, this.state.form.password.value);
    } else {
      this.props.authUpdatePassword(this.props.idToken, this.state.form.password.value);
    }
  }

  render() {
    const { loading, error, type } = this.props;

    const formElementsArray = forms.createFormElementsArray(this.state.form);

    const isReset = type === 'reset-password';

    return (
      <>
        <h2>{isReset ? 'Reset Password' : 'Update Password'}</h2>
        <form onSubmit={(event) => this.submitPasswordResetUpdateForm(event, isReset)} className="form">
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
            <Button type="submit" loading={loading} additionalClasses="modal__submit" disabled={forms.checkSubmitButtonDisabled(this.state.form)}>{isReset ? 'Reset' : 'Update'}</Button>
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
    idToken: state.auth.idToken,
    router: state.router
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authResetPassword: (code, newPassword) => dispatch(actions.authResetPassword(code, newPassword)),
    authUpdatePassword: (idToken, newPassword) => dispatch(actions.authUpdatePassword(idToken, newPassword))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetUpdatePassword);
