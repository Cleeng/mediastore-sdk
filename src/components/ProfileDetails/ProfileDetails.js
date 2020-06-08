/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Card from 'components/Card';
import MyAccountInput from 'components/MyAccountInput';
import Loader from 'components/Loader';
import {
  ButtonStyled,
  ButtonWrapperStyled
} from 'components/MyAccountConsents/MyAccountConsentsStyled';
import validateEmailField from 'components/EmailInput/EmailHelper';
import updateCustomer from 'api/Customer/updateCustomer';
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
        confirmationPassword: ''
      },
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        confirmationPassword: ''
      },
      isSectionDisabled: true,
      isSubmittingPending: false
    };
  }

  componentDidMount() {
    const { firstName, lastName, email } = this.props;
    this.setState({
      updated: {
        firstName,
        lastName,
        email
      }
    });
  }

  componentDidUpdate() {
    const { updated, isSectionDisabled } = this.state;
    const { firstName, lastName, email } = this.props;
    if (
      isSectionDisabled &&
      (firstName !== updated.firstName ||
        lastName !== updated.lastName ||
        email !== updated.email)
    ) {
      this.setState({
        updated: { firstName, lastName, email, confirmationPassword: '' }
      });
    }
  }

  updateProfile = e => {
    e.preventDefault();
    if (this.areNamesValid() && this.areEmailAndPasswordValid()) {
      this.setState({
        isSubmittingPending: true
      });
      const { updated } = this.state;
      const { email, setCurrentUser, t } = this.props;
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
          const isEmailError = errorMsg.includes('e-mail');
          const isPasswordError = errorMsg.includes('confirmationPassword');
          this.setState({
            errors: {
              confirmationPassword: isPasswordError
                ? t('Incorect password')
                : '',
              email: isEmailError ? errorMsg : ''
            }
          });
        } else {
          setCurrentUser(response.responseData);
          this.setState({
            isSectionDisabled: true
          });
        }
      });
    }
  };

  areNamesValid = () => {
    const { updated } = this.state;
    const { t } = this.props;
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
            : t('Confirmation password is required if you want to change email')
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

  handleInputChange = (fieldName, inputValue) => {
    this.setState(prevState => ({
      updated: { ...prevState.updated, [fieldName]: inputValue }
    }));
  };

  render() {
    const { firstName, lastName, email, isLoading, t } = this.props;
    const {
      updated,
      isSectionDisabled,
      isSubmittingPending,
      errors
    } = this.state;

    return isLoading ? (
      <Loader isMyAccount />
    ) : (
      <WrapStyled>
        <Card>
          <FormStyled onSubmit={this.updateProfile}>
            {InputsData.map(input => (
              <MyAccountInput
                key={input.id}
                id={input.id}
                value={updated[input.id]}
                label={t(input.label)}
                onChange={e => this.handleInputChange(input.id, e.target.value)}
                disabled={isSectionDisabled}
                error={errors[input.id]}
                onBlur={this[input.onBlur]}
                type={input.type}
                hideInput={
                  input.id === 'confirmationPassword' && updated.email === email
                }
              />
            ))}
            <ButtonWrapperStyled>
              {isSectionDisabled ? (
                <ButtonStyled
                  size="small"
                  fontWeight="700"
                  onClickFn={() => this.setState({ isSectionDisabled: false })}
                  width="100%"
                >
                  {t('Edit Profile')}
                </ButtonStyled>
              ) : (
                <>
                  <ButtonStyled
                    size="small"
                    theme="secondary"
                    fontWeight="700"
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
                    size="small"
                    fontWeight="700"
                    fontSize="13px"
                    onClickFn={this.updateProfile}
                    disabled={isSubmittingPending}
                    type="submit"
                  >
                    {(isSubmittingPending && t('Loading...')) || t('Save')}
                  </ButtonStyled>
                </>
              )}
            </ButtonWrapperStyled>
          </FormStyled>
        </Card>
      </WrapStyled>
    );
  }
}

ProfileDetails.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  isLoading: PropTypes.bool,
  setCurrentUser: PropTypes.func,
  t: PropTypes.func
};

ProfileDetails.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  isLoading: false,
  setCurrentUser: () => {},
  t: k => k
};

export { ProfileDetails as PureProfileDetails };

export default withTranslation()(labeling()(ProfileDetails));
