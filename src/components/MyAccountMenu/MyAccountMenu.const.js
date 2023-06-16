import { ReactComponent as PlanIcon } from './icons/plan_details.svg';
import { ReactComponent as PaymentIcon } from './icons/payment.svg';
import { ReactComponent as UpdateIcon } from './icons/update.svg';

// eslint-disable-next-line import/prefer-default-export
export const MenuItems = [
  {
    id: 'planDetails',
    icon: PlanIcon,
    label: 'Plan Details',
    link: 'plan-details',
    translationKey: 'menuitem.plan-details',
    visibleOnDesktop: true
  },
  {
    id: 'paymentInfo',
    icon: PaymentIcon,
    label: 'Your Payments',
    link: 'payment-info',
    translationKey: 'menuitem.your-payments',
    visibleOnDesktop: true
  },
  {
    id: 'updateProfile',
    icon: UpdateIcon,
    label: 'Update Profile',
    link: 'update-profile',
    translationKey: 'menuitem.update-profile',
    visibleOnDesktop: true
  }
];
