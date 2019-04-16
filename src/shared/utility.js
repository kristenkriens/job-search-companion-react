export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const checkValidity = (value, rules) => {
  let isValid = true;

  if(rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if(rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if(rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if(rules.isEmail) {
    let testEmail = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    isValid = testEmail.test(value) && isValid;
  }

  return isValid;
}

export const checkSubmitButtonDisabled = (form) => {
  let submitButtonDisabled = false;
  for(let key in form) {
    if(!form[key].valid) {
      submitButtonDisabled = true;
    }
  }

  return submitButtonDisabled;
}

export const inputChanged = (that, event, inputName) => {
  const updatedForm = updateObject(that.state.form, {
    [inputName]: updateObject(that.state.form[inputName], {
      value: event.target.value,
      valid: checkValidity(event.target.value, that.state.form[inputName].validation)
    })
  });

  that.setState({form: updatedForm});
}

export const submitForm = (that, event) => {
  event.preventDefault();

  that.props.auth(that.state.form.email.value, that.state.form.password.value, that.state.isRegister);
}
