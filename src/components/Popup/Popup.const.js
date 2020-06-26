import WelcomeIcon from './images/welcome.svg';
import ConsentsIcon from './images/icon_terms.svg';
import PasswordResetIcon from './images/password_reset.svg';
import EmailIcon from './images/email_sent.svg';

const popupData = {
  notCheckedTerms: {
    steps: [
      {
        headerTitle: 'Terms & Conditions',
        icon: WelcomeIcon,
        title: 'Hi there!',
        text:
          'Thanks for joining our serivce. In last step you need to accept Terms & Conditions.',
        buttonText: 'Okey, Go next',
        buttonAction: 'renderNextStep'
      },
      {
        headerTitle: 'Terms & Conditions',
        icon: null,
        title: 'Terms & Conditions',
        text: 'Please accept Terms & Conditions before going to myAccount.',
        buttonText: 'Agree, let’s go!',
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
        title: 'Updated Terms & Conditions',
        text:
          'If you want to continue using myAccount, please agree with updated Terms & Conditions.',
        buttonText: 'Agree, let’s go!',
        buttonAction: 'handleSubmitConsents'
      }
    ]
  },
  consentsUpdateRequired: {
    steps: [
      {
        headerTitle: 'Terms update',
        icon: ConsentsIcon,
        title: 'New terms added',
        text: `We've updated our Terms Details in Update Profile tab. Please, take a few minutes to read them.`,
        buttonText: 'Okey, thanks',
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
        title: 'Updated Terms & Conditions',
        text: `If you want to continue using myAccount, please agree with updated Terms & Conditions.`,
        buttonText: 'Agree, let’s go!',
        buttonAction: 'handleSubmitConsents'
      }
    ]
  },
  resetPassword: {
    steps: [
      {
        headerTitle: 'Password Reset',
        icon: PasswordResetIcon,
        title: 'Password Reset',
        text: `If you want to reset your password, click 'YES, Reset' to receive password reset instruction on your mail `,
        buttonText: 'Yes, Reset',
        buttonAction: 'resetPassword',
        undoButton: 'No, thanks'
      },
      {
        headerTitle: 'Password Reset',
        icon: EmailIcon,
        title: 'Email has been sent!',
        text: `Please check you inbox and check the Instruction to reset a password`,
        buttonText: 'Thanks!',
        buttonAction: 'logout'
      }
    ]
  }
};
export default popupData;
