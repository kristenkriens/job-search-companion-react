import { updateObject } from './utility';

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

export const createFormElementsArray = (form) => {
  const formElementsArray = [];
  for(let key in form) {
    formElementsArray.push({
      id: key,
      config: form[key]
    });
  }

  return formElementsArray;
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

export const submitAuthForm = (that, event) => {
  event.preventDefault();

  that.props.auth(that.state.form.email.value, that.state.form.password.value, that.state.isRegister);
}

export const submitSearchForm = (that, event) => {
  event.preventDefault();

  console.log('Search Form Submitted');
}
