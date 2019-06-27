import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormElement from '../../FormElement/FormElement';
import Button from '../../Button/Button';
import LinkButton from '../../Button/LinkButton/LinkButton';

import BlankUser from '../../../../assets/images/blank-user.gif';

import * as forms from '../../../../shared/forms';
import * as actions from '../../../../store/actions/index';

class Profile extends Component {
  state = {
    form: {
      image: {
        elementType: 'file',
        elementConfig: {
          accept: 'image/*'
        },
        label: 'Image',
        value: BlankUser,
        validation: {
          required: false
        },
        valid: true
      },
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'John Doe'
        },
        label: 'Name',
        value: '',
        validation: {
          required: false
        },
        valid: true
      }
    }
  }

  submitProfileForm = (event) => {
    event.preventDefault();

    const isEdit = this.props.type === 'edit-profile';

    this.props.authSetProfile(this.props.token, this.state.form.name.value, this.state.form.image.value, isEdit);
  }

  render() {
    const { type, click, loading, error } = this.props;

    const formElementsArray = forms.createFormElementsArray(this.state.form);

    return (
      <>
        <h2>My Profile</h2>
        <form onSubmit={(event) => this.submitProfileForm(event)} className="form">
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
                fileChanged={(event) => forms.formElementFileChanged(this, event, formElement.id)}
              />
            )
          })}
          <div className="form__footer form__footer--center">
            <Button type="submit" loading={loading} additionalClasses="modal__submit" disabled={forms.checkSubmitButtonDisabled(this.state.form)}>{type === 'profile' ? 'Submit' : 'Save'}</Button>
          </div>
        </form>
        {type === 'profile' && (
          <LinkButton additionalClasses="modal__link" click={click}>Skip</LinkButton>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authSetProfile: (token, displayName, photoUrl, isEdit) => dispatch(actions.authSetProfile(token, displayName, photoUrl, isEdit))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
