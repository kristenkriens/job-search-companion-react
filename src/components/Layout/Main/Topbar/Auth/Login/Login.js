import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormElement from '../../../../../UI/FormElement/FormElement';
import Button from '../../../../../UI/Button/Button';

import { updateObject, checkValidity } from '../../../../../../shared/utility';
import * as actions from '../../../../../../store/actions/index';

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
        valid: false,
        touched: false
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
        valid: false,
        touched: false
      }
    },
    isRegister: false
  }

  inputChangedHandler = (event, inputName) => {
    const updatedForm = updateObject(this.state.form, {
      [inputName]: updateObject(this.state.form[inputName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.form[inputName].validation),
        touched: true
      })
    });

    this.setState({form: updatedForm});
  }

  submitHandler = (event) => {
    event.preventDefault();

    this.props.auth(this.state.form.email.value, this.state.form.password.value, this.state.isRegister);
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

    let disabled = false;
    for(let key in this.state.form) {
      if(!this.state.form[key].valid) {
        disabled = true;
      }
    }

    let form = formElementsArray.map((formElement) => {
      return (
        <FormElement
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          label={formElement.config.label}
          value={formElement.config.value}
          error={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      )
    });

    return (
      <>
        <h2>Log In</h2>
        <form onSubmit={this.submitHandler} className="form">
          {form}
          <Button type="submit" additionalClasses="modal__submit" disabled={disabled}>Submit</Button>
        </form>
        <button className="modal__link" onClick={() => setActiveModal('register')}>New user? Create an account</button>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    setActiveModal: (modalType) => dispatch(actions.setActiveModal(modalType)),
    toggleModal: () => dispatch(actions.toggleModal())
  }
}

export default connect(null, mapDispatchToProps)(Login);
