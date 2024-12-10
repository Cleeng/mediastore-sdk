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
    { regex: /[a-z]/, score: 1 },
    { regex: /[A-Z]/, score: 5 },
    { regex: /\d/, score: 5 },
    { regex: /\d.*\d/, score: 5 },
    { regex: /[!,@#$%^&*?_~]/, score: 5 },
    { regex: /[!,@#$%^&*?_~].*[!,@#$%^&*?_~]/, score: 5 },
    { regex: /[a-z].*[A-Z]|[A-Z].*[a-z]/, score: 2 },
    { regex: /\d.*\D|\D.*\d/, score: 2 },
    { regex: /[a-z].*[A-Z].*\d.*[!,@#$%^&*?_~]/, score: 2 }
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
