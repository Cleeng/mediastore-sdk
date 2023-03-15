import { ReactComponent as PayPalIcon } from 'assets/images/paymentMethods/PPicon.svg';
import classNames from 'classnames';
import { selectPaymentMethods } from 'redux/paymentMethodsSlice';
import { useAppSelector } from 'redux/store';
import {
  IconWrapperStyled,
  TextStyled,
  TitleStyled,
  WrapperStyled
} from './DropInSectionStyled';
import { DropInSectionProps } from './DropInSection.types';

const DropInSection = ({
  children,
  selectPaymentMethod,
  title,
  logo,
  isCardAvailable,
  isLoading
}: DropInSectionProps) => {
  const { selectedPaymentMethod } = useAppSelector(selectPaymentMethods);
  const isSelected = selectedPaymentMethod?.methodName === title.toLowerCase();
  const fadeOutSection =
    isLoading && selectedPaymentMethod?.methodName !== title.toLowerCase();
  const mapImage = {
    paypal: PayPalIcon
  };
  const LogoComponent = logo === 'paypal' ? mapImage[logo] : null;
  return (
    <WrapperStyled
      isSelected={isSelected}
      isCardAvailable={isCardAvailable}
      onClick={() => !fadeOutSection && selectPaymentMethod('paypal')}
      fadeOutSection={fadeOutSection}
    >
      <TextStyled>
        <span
          className={classNames('adyen-checkout__payment-method__radio', {
            'adyen-checkout__payment-method__radio--selected': isSelected
          })}
          aria-hidden={!isSelected}
        />
        <IconWrapperStyled>
          {LogoComponent && <LogoComponent />}
        </IconWrapperStyled>
        <TitleStyled>{title}</TitleStyled>
      </TextStyled>
      {isSelected && children}
    </WrapperStyled>
  );
};

export default DropInSection;
