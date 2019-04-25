import { updateObject } from './utilities';

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

export const formElementChanged = (that, event, formElementName) => {
  const updatedForm = updateObject(that.state.form, {
    [formElementName]: updateObject(that.state.form[formElementName], {
      value: event.target.value,
      valid: that.state.form[formElementName].validation ? checkValidity(event.target.value, that.state.form[formElementName].validation) : undefined
    })
  });

  that.setState({form: updatedForm});
}

export const formElementReduxChanged = (that, formElementName, value) => {
  const updatedForm = updateObject(that.state.form, {
    [formElementName]: updateObject(that.state.form[formElementName], {
      value: value,
      valid: that.state.form[formElementName].validation ? checkValidity(value, that.state.form[formElementName].validation) : undefined
    })
  });

  that.setState({form: updatedForm});
}

export const geolocateClick = (that, event) => {
  event.preventDefault();

  that.props.geolocateLatLng();
}

export const submitAuthForm = (that, event) => {
  event.preventDefault();

  that.props.authGo(that.state.form.email.value, that.state.form.password.value, that.state.isRegister);
}

export const submitSearchForm = (that, event, userIp, userAgent, start, limit) => {
  const { searchGo, searchPaginationChange } = that.props;

  event.preventDefault();

  searchGo(userAgent, userIp, start, limit, that.state.form.query.value, that.state.form.location.value, that.state.form.country.value, that.state.form.radius.value, that.state.form.jobType.value, that.state.form.age.value);
  searchPaginationChange(0, 1);
}

export const clickSearchPagination = (that, event, page) => {
  const { userIp, userAgent, query, location, country, radius, jobType, age, limit, searchGo, searchPaginationChange } = that.props;

  const start = page === 0 ? page * limit : (page - 1) * limit;

  event.preventDefault();

  searchGo(userAgent, userIp, start, limit, query, location, country, radius, jobType, age);
  searchPaginationChange(start, page);
}
