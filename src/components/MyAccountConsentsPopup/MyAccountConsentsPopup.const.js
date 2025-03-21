const popupData = {
  notCheckedTerms: {
    steps: [
      {
        headerTitle: 'Terms & Conditions',
        icon: true,
        title: 'Hi there!',
        text: 'Your brand new account is waiting for you. Just one last step. We would like you to review our terms and conditions before continuing to your account.',
        buttonText: 'Let’s do it',
        translationKeys: {
          header: 'popup.not-checked-terms.header',
          title: 'popup.not-checked-terms.title',
          text: 'popup.not-checked-terms.text',
          button: 'popup.not-checked-terms.button'
        }
      },
      {
        headerTitle: 'Terms & Conditions',
        icon: true,
        title: 'Terms & Conditions',
        text: 'Please accept our terms and conditions before continuing to your account.',
        buttonText: 'Continue',
        translationKeys: {
          header: 'popup.not-checked-terms2.header',
          title: 'popup.not-checked-terms2.title',
          text: 'popup.not-checked-terms2.text',
          button: 'popup.not-checked-terms2.button'
        }
      }
    ]
  },
  termsUpdateRequired: {
    steps: [
      {
        headerTitle: 'Terms update',
        icon: true,
        title: 'A change in our terms',
        text: 'One of our mandatory terms has been updated. Review the changes to continue.',
        buttonText: 'Okey, Go next',
        translationKeys: {
          header: 'popup.terms-update-required.header',
          title: 'popup.terms-update-required.title',
          text: 'popup.terms-update-required.text',
          button: 'popup.terms-update-required.button'
        }
      },
      {
        headerTitle: 'Terms update',
        icon: null,
        title: 'Update to terms & conditions',
        text: 'Please review and accept our updated terms and conditions before continuing to your account.',
        buttonText: 'Continue',
        translationKeys: {
          header: 'popup.terms-update-required2.header',
          title: 'popup.terms-update-required2.title',
          text: 'popup.terms-update-required2.text',
          button: 'popup.terms-update-required2.button'
        }
      }
    ]
  },
  consentsUpdateRequired: {
    steps: [
      {
        headerTitle: 'Terms update',
        icon: true,
        title: 'Update to terms & conditions',
        text: 'We have updated our terms and conditions. Please take a few minutes to review the changes in your profile section',
        buttonText: 'Continue',
        translationKeys: {
          header: 'popup.consents-update-required.header',
          title: 'popup.consents-update-required.title',
          text: 'popup.consents-update-required.text',
          button: 'popup.consents-update-required.button'
        }
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
        buttonText: 'Okey, Go next!',
        translationKeys: {
          header: 'popup.complex-update.header',
          title: 'popup.complex-update.title',
          text: 'popup.complex-update.text',
          secondText: 'popup.complex-update.secondText',
          button: 'popup.complex-update.button'
        }
      },
      {
        headerTitle: 'Terms update',
        icon: null,
        title: 'Update to terms & conditions',
        text: 'Please review and accept our updated terms and conditions before continuing to your account.',
        buttonText: 'Continue',
        translationKeys: {
          header: 'popup.complex-update2.header',
          title: 'popup.complex-update2.title',
          text: 'popup.complex-update2.text',
          button: 'popup.complex-update2.button'
        }
      }
    ]
  }
};
export default popupData;
