import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passError: '',
      errorLabel: ''
    };
  }

  onChangeFunction = value => {
    const { onChange, showPasswordStrength } = this.props;
    if (showPasswordStrength) {
      const passwordStrength = this.validateNewPassword(value);
      this.setState({
        passError: this.getErrorMessage(passwordStrength),
        errorLabel: passwordStrength
      });
    }
    onChange(value);
  };

  validateNewPassword = pass => {
    let score = 0;
    if (
      pass &&
      pass.length >= 8 &&
      pass.match(/\d+/) &&
      pass.match(/[a-zA-Z]/)
    ) {
      if (pass.match(/[a-z]/)) {
        score += 1;
      }
      if (pass.match(/[A-Z]/)) {
        score += 5;
      }
      if (pass.match(/\d+/) && !pass.match(/^[0-9]*$/)) {
        score += 5;
      }
      if (pass.match(/(\d.*\d)/)) {
        score += 5;
      }
      if (pass.match(/[!,@#$%^&*?_~]/)) {
        score += 5;
      }
      if (pass.match(/([!,@#$%^&*?_~].*[!,@#$%^&*?_~])/)) {
        score += 5;
      }
      if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) {
        score += 2;
      }
      if (pass.match(/\d/) && pass.match(/\D/)) {
        score += 2;
      }
      if (
        pass.match(/[a-z]/) &&
        pass.match(/[A-Z]/) &&
        pass.match(/\d/) &&
        pass.match(/[!,@#$%^&*?_~]/)
      ) {
        score += 2;
      }
      if (score <= 8) {
        return 'Weak';
      }
      if (score > 8 && score <= 16) {
        return 'Fair';
      }
      if (score > 16 && score <= 24) {
        return 'Good';
      }
      if (score > 24 && score <= 32) {
        return 'Strong';
      }
    }
    return 'NotValid';
  };

  getErrorMessage = msg => {
    const { t } = this.props;
    const errorLabel = {
      Weak: t('Weak'),
      Fair: t('Could be stronger'),
      Good: t('Good password'),
      Strong: t('Strong password'),
      NotValid: t(
        'Your password must contain at least 8 characters, including 1 digit.'
      )
    };

    return errorLabel[msg];
  };

  render() {
    const {
      value,
      onBlur,
      error,
      showVisibilityIcon,
      showPassword,
      handleClickShowPassword,
      label
    } = this.props;
    const { passError, errorLabel } = this.state;
    const errorMsg = error || passError;
    return (
      <>
        <Input
          placeholder={label}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={this.onChangeFunction}
          onBlur={onBlur}
          error={errorMsg}
          showVisibilityIcon={showVisibilityIcon}
          handleClickShowPassword={handleClickShowPassword}
          showPassword={showPassword}
          passwordStrength={errorLabel}
          ariaRequired
          ariaInvalid={errorLabel === 'NotValid'}
        />
      </>
    );
  }
}

PasswordInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  showVisibilityIcon: PropTypes.bool,
  showPassword: PropTypes.bool,
  handleClickShowPassword: PropTypes.func,
  label: PropTypes.string,
  showPasswordStrength: PropTypes.bool,
  t: PropTypes.func
};

PasswordInput.defaultProps = {
  value: '',
  onChange: () => {},
  onBlur: () => {},
  error: '',
  showVisibilityIcon: false,
  showPassword: false,
  handleClickShowPassword: () => {},
  label: 'Password',
  showPasswordStrength: false,
  t: k => k
};

export default PasswordInput;
