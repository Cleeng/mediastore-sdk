const getPasswordStrength = (password: string) => {
  if (
    !password ||
    password.length < 8 ||
    !/\d/.test(password) ||
    !/[a-zA-Z]/.test(password)
  ) {
    return 'NotValid';
  }

  const criteria = [
    // checks if there is at least:
    { regex: /[a-z]/, score: 1 }, // one lowercase letter
    { regex: /[A-Z]/, score: 5 }, // one uppercase letter
    { regex: /\d/, score: 5 }, // one digit
    { regex: /(?=(.*\d){2})/, score: 5 }, // two digits
    { regex: /[!,@#$%^&*?_~]/, score: 5 }, // one special character
    { regex: /(?=(.*[!,@#$%^&*?_~]){2})/, score: 5 }, // two special characters
    { regex: /(?=.*[a-z])(?=.*[A-Z])/, score: 2 }, // one lowercase and one uppercase letter
    { regex: /(?=.*\d)(?=.*\D)/, score: 2 }, // digit and one non-digit character
    { regex: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!,@#$%^&*?_~])/, score: 2 } // one lowercase letter, one uppercase letter, one digit, and one special character
  ];

  const score = criteria.reduce((sum, criterion) => {
    return criterion.regex.test(password) ? sum + criterion.score : sum;
  }, 0);

  if (score <= 8) return 'Weak';
  if (score <= 16) return 'Fair';
  if (score <= 24) return 'Good';
  if (score <= 32) return 'Strong';

  return 'NotValid';
};

export default getPasswordStrength;
