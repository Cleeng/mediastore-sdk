import { useTranslation } from 'react-i18next';
import SecurityIcon from 'assets/images/security.svg';
import CleengLogo from 'assets/images/cleeng.svg';
import {
  FooterStyled,
  ProductByStyled,
  SecurityStyled,
  CleengLogoWrapperStyled
} from './FooterStyled';

type FooterProps = {
  isInPopup?: boolean;
  isCheckout?: boolean;
  isTransparent?: boolean;
};

const Footer = ({
  isInPopup = false,
  isCheckout = true,
  isTransparent = false
}: FooterProps) => {
  const { t } = useTranslation();

  return (
    <FooterStyled $isInPopup={isInPopup} $isTransparent={isTransparent}>
      <ProductByStyled>
        Powered by
        <CleengLogoWrapperStyled
          href='https://cleeng.com/who-are-cleeng'
          rel='noopener noreferrer'
          target='_blank'
        >
          <CleengLogo title='Cleeng logo' />
        </CleengLogoWrapperStyled>
      </ProductByStyled>
      {isCheckout && (
        <SecurityStyled>
          <SecurityIcon
            title={t('footer.secured-checkout', 'Secured checkout')}
          />
          {t('footer.secured-checkout', 'Secured checkout')}
        </SecurityStyled>
      )}
    </FooterStyled>
  );
};

export default Footer;
