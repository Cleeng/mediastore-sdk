import WelcomeIcon from './images/welcome.svg';
import ConsentsIcon from './images/icon_terms.svg';

const popupData = {
  notCheckedTerms: {
    steps: [
      {
        headerTitle: 'Terms & Conditions',
        icon: WelcomeIcon,
        title: 'Hi there!',
        text:
          'Your brand new account is waiting for you. Just one last step. We would like you to review our terms and conditions before continuing to your account.',
        buttonText: 'Let’s do it',
        buttonAction: 'renderNextStep'
      },
      {
        headerTitle: 'Terms & Conditions',
        icon: WelcomeIcon,
        title: 'Terms & Conditions',
        text:
          'Please accept our terms and conditions before continuing to your account.',
        buttonText: 'Continue',
        buttonAction: 'handleSubmitConsents'
      }
    ]
  },
  termsUpdateRequired: {
    steps: [
      {
        headerTitle: 'Terms update',
        icon: ConsentsIcon,
        title: 'A change in our terms',
        text:
          'One of our mandatory terms has been updated. Review the changes to continue.',
        buttonText: 'Okey, Go next',
        buttonAction: 'renderNextStep'
      },
      {
        headerTitle: 'Terms update',
        icon: null,
        title: 'Update to terms & conditions',
        text:
          'Please review and accept our updated terms and conditions before continuing to your account.',
        buttonText: 'Continue',
        buttonAction: 'handleSubmitConsents'
      }
    ]
  },
  consentsUpdateRequired: {
    steps: [
      {
        headerTitle: 'Terms update',
        icon: ConsentsIcon,
        title: 'Update to terms & conditions',
        text: `We have updated our terms and conditions. Please take a few minutes to review the changes in your profile section.`,
        buttonText: 'Continue',
        buttonAction: 'handleSubmitConsents'
      }
    ]
  },
  complexUpdate: {
    steps: [
      {
        headerTitle: 'Terms update',
        icon: ConsentsIcon,
        title: 'A change in our terms',
        text: `One of our mandatory terms has been updated. We’ve also updated our Consents Details which you can find in Update Profile tab.`,
        secondText: 'Review the changes to continue.',
        buttonText: 'Okey, Go next!',
        buttonAction: 'renderNextStep'
      },
      {
        headerTitle: 'Terms update',
        icon: null,
        title: 'Update to terms & conditions',
        text: `Please review and accept our updated terms and conditions before continuing to your account.`,
        buttonText: 'Continue',
        buttonAction: 'handleSubmitConsents'
      }
    ]
  }
};
export default popupData;
