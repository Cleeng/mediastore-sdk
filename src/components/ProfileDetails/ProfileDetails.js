/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Card from 'components/Card';
import MyAccountInput from 'components/MyAccountInput';
import {
  ButtonStyled,
  ButtonWrapperStyled,
  SuccessMessageStyled
} from 'components/MyAccountConsents/MyAccountConsentsStyled';
import { validateEmailField } from 'util/validators';
import updateCustomer from 'api/Customer/updateCustomer';
import updateCaptureAnswers from 'api/Customer/updateCaptureAnswers';
import Auth from 'services/auth';
import SkeletonWrapper from 'components/SkeletonWrapper';
import Loader from 'components/Loader';
import { WrapStyled, FormStyled } from './ProfileDetailsStyled';

const InputsData = [
  {
    id: 'firstName',
    label: 'First Name',
    onBlur: 'areNamesValid',
    type: 'text'
  },
  {
    id: 'lastName',
    label: 'Last Name',
    onBlur: 'areNamesValid',
    type: 'text'
  },
  {
    id: 'email',
    label: 'E-mail',
    onBlur: 'areEmailAndPasswordValid',
    type: 'email'
  },
  {
    id: 'confirmationPassword',
    label: 'Confirmation password',
    onBlur: 'areEmailAndPasswordValid',
    type: 'password'
  },
  {
    id: 'birthDate',
    label: 'Birth Date',
    onBlur: 'isBirthDateValid',
    type: 'date'
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    onBlur: 'isPhoneNumberValid',
    type: 'tel'
  },
  {
    id: 'companyName',
    label: 'Company Name',
    onBlur: 'isCompanyNameValid',
    type: 'text'
  }
];

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: {
        firstName: '',
        lastName: '',
        email: '',
        confirmationPassword: '',
        birthDate: '',
        phoneNumber: '',
        companyName: ''
      },
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        confirmationPassword: '',
        birthDate: '',
        phoneNumber: '',
        companyName: ''
      },
      isSectionDisabled: true,
      isSubmittingPending: false,
      successMessage: false
    };
  }

  componentDidMount() {
    const {
      firstName,
      lastName,
      email,
      birthDate,
      phoneNumber,
      companyName
    } = this.props;

    const { updated } = this.state;
    this.setState({
      updated: {
        ...updated,
        firstName,
        lastName,
        email,
        birthDate: birthDate ? birthDate.answer : '',
        phoneNumber: phoneNumber ? phoneNumber.answer : '',
        companyName: companyName ? companyName.answer : ''
      }
    });
  }

  componentDidUpdate() {
    const { updated, isSectionDisabled } = this.state;
    const {
      firstName,
      lastName,
      email,
      birthDate,
      phoneNumber,
      companyName
    } = this.props;
    if (
      isSectionDisabled &&
      (firstName !== updated.firstName ||
        lastName !== updated.lastName ||
        email !== updated.email ||
        (birthDate && birthDate.answer !== updated.birthDate) ||
        (phoneNumber && phoneNumber.answer !== updated.phoneNumber) ||
        (companyName && companyName.answer !== updated.companyName))
    ) {
      this.setState({
        updated: {
          ...updated,
          firstName,
          lastName,
          email,
          confirmationPassword: '',
          birthDate: birthDate ? birthDate.answer : '',
          phoneNumber: phoneNumber ? phoneNumber.answer : '',
          companyName: companyName ? companyName.answer : ''
        }
      });
    }
  }

  updateProfile = e => {
    e.preventDefault();
    const { updated } = this.state;
    const { email, setCurrentUser, updateCaptureOption, t } = this.props;
    const shouldLogOut = updated.email !== email;

    if (
      !this.areNamesValid() ||
      !this.areEmailAndPasswordValid() ||
      !this.isBirthDateValid() ||
      !this.isCompanyNameValid() ||
      !this.isPhoneNumberValid()
    ) {
      return;
    }

    this.setState({
      isSubmittingPending: true
    });
    updateCustomer({
      firstName: updated.firstName,
      lastName: updated.lastName,
      email: updated.email !== email ? updated.email : '',
      confirmationPassword:
        updated.email !== email ? updated.confirmationPassword : ''
    }).then(response => {
      this.setState({
        isSubmittingPending: false
      });
      if (response.errors.length) {
        const errorMsg = response.errors[0];
        const isEmailError = errorMsg.includes('mail');
        const isPasswordError = errorMsg.includes('confirmationPassword');
        this.setState({
          errors: {
            confirmationPassword: isPasswordError ? t('Incorect password') : '',
            email: isEmailError ? errorMsg : ''
          },
          successMessage: false
        });
      } else {
        setCurrentUser(response.responseData);
        this.setState({
          isSectionDisabled: true,
          successMessage: true
        });
        if (shouldLogOut) {
          Auth.logout();
        }
      }
    });

    this.setState({
      isSubmittingPending: true
    });
    updateCaptureAnswers({
      birthDate: updated.birthDate,
      companyName: updated.companyName,
      phoneNumber: updated.phoneNumber
    }).then(() => {
      updateCaptureOption({ key: 'birthDate', value: updated.birthDate });
      updateCaptureOption({ key: 'companyName', value: updated.companyName });
      updateCaptureOption({ key: 'phoneNumber', value: updated.phoneNumber });
      this.setState({
        isSubmittingPending: false,
        isSectionDisabled: true,
        successMessage: true
      });
    });
  };

  isBirthDateValid = () => {
    const { updated } = this.state;
    const { t } = this.props;

    if (!updated.birthDate) {
      this.setState({
        errors: {
          birthDate: t('Birth date is required')
        }
      });

      return false;
    }

    return true;
  };

  areNamesValid = () => {
    const { updated } = this.state;
    const { t, capture } = this.props;

    const areNamesRequired = capture?.settings?.find(
      setting => setting.key === 'firstNameLastName'
    )?.required;

    if (areNamesRequired && !updated.firstName.length) {
      this.setState({
        errors: {
          firstName: t('First name is required')
        }
      });

      return false;
    }

    if (areNamesRequired && !updated.lastName.length) {
      this.setState({
        errors: {
          lastName: t('Last name is required')
        }
      });

      return false;
    }

    if (updated.firstName.length > 50 || updated.lastName.length > 50) {
      this.setState({
        errors: {
          firstName:
            updated.firstName.length > 50
              ? t('First name can have max 50 characters')
              : '',
          lastName:
            updated.lastName.length > 50
              ? t('Last name can have max 50 characters')
              : ''
        }
      });
      return false;
    }
    this.setState({
      errors: {
        firstName: '',
        lastName: ''
      }
    });
    return true;
  };

  areEmailAndPasswordValid = () => {
    const { updated } = this.state;
    const { email, t } = this.props;

    if (updated.email === email) {
      this.setState({ errors: { email: '' } });
      return true;
    }
    const isEmailValid = !validateEmailField(updated.email).length;
    const isPasswordValid = !!updated.confirmationPassword;
    if (!isEmailValid || !isPasswordValid) {
      this.setState({
        errors: {
          email: validateEmailField(updated.email),
          confirmationPassword: updated.confirmationPassword
            ? ''
            : t(
                'Please confirm your password to proceed with changing your email address.'
              )
        }
      });
      return false;
    }
    this.setState({
      errors: {
        email: '',
        confirmationPassword: ''
      }
    });
    return true;
  };

  isPhoneNumberValid = () => {
    const { updated } = this.state;
    const {
      t,
      phoneNumber: { required }
    } = this.props;

    if (required && !updated.phoneNumber) {
      this.setState({
        errors: {
          phoneNumber: t('Phone number is required')
        }
      });

      return false;
    }

    const regexp = /^[0-9()+-\s]+$/;
    if (updated.phoneNumber && !regexp.test(updated.phoneNumber)) {
      this.setState({
        errors: {
          phoneNumber: t('This is not a valid phone number')
        }
      });
      return false;
    }
    this.setState({
      errors: {
        phoneNumber: ''
      }
    });
    return true;
  };

  isCompanyNameValid = () => {
    const { updated } = this.state;
    const {
      t,
      companyName: { required }
    } = this.props;

    if (required && !updated.companyName) {
      this.setState({
        errors: {
          companyName: t('Company name is required')
        }
      });

      return false;
    }

    if (updated.companyName && updated.companyName.length > 50) {
      this.setState({
        errors: {
          companyName:
            updated.companyName.length > 50
              ? t('Company name can have max 50 characters')
              : ''
        }
      });
      return false;
    }
    this.setState({
      errors: {
        companyName: ''
      }
    });
    return true;
  };

  handleInputChange = (fieldName, inputValue) => {
    this.setState(prevState => ({
      updated: { ...prevState.updated, [fieldName]: inputValue }
    }));
  };

  render() {
    const { firstName, lastName, capture, email, isLoading, t } = this.props;

    const {
      updated,
      isSectionDisabled,
      isSubmittingPending,
      errors,
      successMessage
    } = this.state;

    const areNamesRequired = capture?.settings?.find(
      setting => setting.key === 'firstNameLastName'
    )?.required;

    return (
      <WrapStyled>
        <Card withBorder>
          {isLoading ? (
            <>
              {[...Array(3)].map((i, k) => (
                // eslint-disable-next-line react/no-array-index-key
                <React.Fragment key={`skeleton-item-${k}`}>
                  <SkeletonWrapper width={100} margin="0 0 12px 0" />
                  <SkeletonWrapper height={40} margin="0 0 28px 0" />
                </React.Fragment>
              ))}
              <SkeletonWrapper height={40} width={140} margin="40px 0 0 auto" />
            </>
          ) : (
            <FormStyled onSubmit={this.updateProfile}>
              {successMessage && (
                <SuccessMessageStyled>
                  {t('Your profile details have been changed successfully')}
                </SuccessMessageStyled>
              )}
              {InputsData.map(input => {
                const shouldBeHidden =
                  typeof this.props[input.id] === 'object' &&
                  !this.props[input.id]?.enabled;

                const isRequired = () => {
                  switch (input.id) {
                    case 'firstName':
                    case 'lastName':
                      return areNamesRequired;

                    case 'email':
                      return true;

                    default:
                      return this.props[input.id]?.required;
                  }
                };

                return !shouldBeHidden ? (
                  <MyAccountInput
                    key={input.id}
                    id={input.id}
                    value={updated[input.id] || ''}
                    label={t(input.label)}
                    onChange={e =>
                      this.handleInputChange(input.id, e.target.value)
                    }
                    disabled={isSectionDisabled}
                    error={errors[input.id]}
                    onBlur={this[input.onBlur]}
                    type={input.type}
                    name={input.id}
                    hideInput={
                      input.id === 'confirmationPassword' &&
                      updated.email === email
                    }
                    autoComplete={
                      input.id === 'confirmationPassword'
                        ? 'new-password'
                        : 'off'
                    }
                    required={isRequired()}
                  />
                ) : null;
              })}
              <ButtonWrapperStyled>
                {isSectionDisabled ? (
                  <ButtonStyled
                    onClickFn={() =>
                      this.setState({ isSectionDisabled: false })
                    }
                    width="100%"
                  >
                    {t('Edit Profile')}
                  </ButtonStyled>
                ) : (
                  <>
                    <ButtonStyled
                      theme="simple"
                      onClickFn={() =>
                        this.setState({
                          isSectionDisabled: true,
                          updated: {
                            firstName,
                            lastName,
                            email,
                            confirmationPassword: ''
                          },
                          errors: {
                            firstName: '',
                            lastName: '',
                            email: '',
                            confirmationPassword: ''
                          }
                        })
                      }
                    >
                      {t('Cancel')}
                    </ButtonStyled>
                    <ButtonStyled
                      onClickFn={this.updateProfile}
                      disabled={isSubmittingPending}
                      type="submit"
                      theme="confirm"
                    >
                      {(isSubmittingPending && (
                        <Loader buttonLoader color="#ffffff" />
                      )) ||
                        t('Save')}
                    </ButtonStyled>
                  </>
                )}
              </ButtonWrapperStyled>
            </FormStyled>
          )}
        </Card>
      </WrapStyled>
    );
  }
}

ProfileDetails.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  birthDate: PropTypes.objectOf(PropTypes.any),
  phoneNumber: PropTypes.objectOf(PropTypes.any),
  companyName: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool,
  setCurrentUser: PropTypes.func,
  updateCaptureOption: PropTypes.func,
  capture: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func
};

ProfileDetails.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  birthDate: null,
  phoneNumber: null,
  companyName: null,
  isLoading: false,
  capture: null,
  setCurrentUser: () => null,
  updateCaptureOption: () => null,
  t: k => k
};

export { ProfileDetails as PureProfileDetails };

export default withTranslation()(ProfileDetails);
