const popupData = {
  notCheckedTerms: {
    steps: [
      {
        headerTitle: 'Terms & Conditions',
        icon: true,
        title: 'Hi there!',
        text:
          'Your brand new account is waiting for you. Just one last step. We would like you to review our terms and conditions before continuing to your account.',
        buttonText: 'Let’s do it'
      },
      {
        headerTitle: 'Terms & Conditions',
        icon: true,
        title: 'Terms & Conditions',
        text:
          'Please accept our terms and conditions before continuing to your account.',
        buttonText: 'Continue'
      }
    ]
  },
  termsUpdateRequired: {
    steps: [
      {
        headerTitle: 'Terms update',
        icon: true,
        title: 'A change in our terms',
        text:
          'One of our mandatory terms has been updated. Review the changes to continue.',
        buttonText: 'Okey, Go next'
      },
      {
        headerTitle: 'Terms update',
        icon: null,
        title: 'Update to terms & conditions',
        text:
          'Please review and accept our updated terms and conditions before continuing to your account.',
        buttonText: 'Continue'
      }
    ]
  },
  consentsUpdateRequired: {
    steps: [
      {
        headerTitle: 'Terms update',
        icon: true,
        title: 'Update to terms & conditions',
        text: `We have updated our terms and conditions. Please take a few minutes to review the changes in your profile section.`,
        buttonText: 'Continue'
      }
    ]
  },
  complexUpdate: {
    steps: [
      {
        headerTitle: 'Terms update',
        icon: true,
        title: 'A change in our terms',
        text: `One of our mandatory terms has been updated. We’ve also updated our Consents Details which you can find in Update Profile tab.`,
        secondText: 'Review the changes to continue.',
        buttonText: 'Okey, Go next!'
      },
      {
        headerTitle: 'Terms update',
        icon: null,
        title: 'Update to terms & conditions',
        text: `Please review and accept our updated terms and conditions before continuing to your account.`,
        buttonText: 'Continue'
      }
    ]
  }
};
export default popupData;
