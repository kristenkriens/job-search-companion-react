import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormElement from '../../FormElement/FormElement';
import Button from '../../Button/Button';
import LinkButton from '../../Button/LinkButton/LinkButton';

import * as forms from '../../../../shared/forms';
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
    }
  }

  render() {
    const { click, forgotPasswordClick, loading, error } = this.props;

    const formElementsArray = forms.createFormElementsArray(this.state.form);

    return (
      <>
        <h2>Log In</h2>
        <form onSubmit={(event) => forms.submitAuthForm(this, event)} className="form">
          {formElementsArray.map(({id, config}) => {
            return (
              <FormElement
                key={id}
                id={id}
                elementType={config.elementType}
                elementConfig={config.elementConfig}
                label={config.label}
                value={config.value}
                error={error}
                changed={(event) => forms.formElementChanged(this, event, id)}
              />
            )
          })}
          <div className="form__footer form__footer--center">
            <Button type="submit" loading={loading} additionalClasses="modal__submit" disabled={forms.checkSubmitButtonDisabled(this.state.form)}>Submit</Button>
          </div>
        </form>
        <LinkButton additionalClasses="modal__link" click={click}>New user? Create an account</LinkButton>
        <LinkButton additionalClasses="modal__link" click={forgotPasswordClick}>Forgot your password?</LinkButton>
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
    authGo: (email, password, isRegister) => dispatch(actions.authGo(email, password, isRegister))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
