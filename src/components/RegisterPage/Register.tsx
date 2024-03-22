import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import Header from 'components/Header';
import Footer from 'components/Footer';
import {
  ContentWrapperStyled,
  LoginWrapperStyled as RegisterWrapperStyled
} from 'components/LoginPage/LoginStyled';
import RegisterForm from './RegisterForm';
import { RegisterProps } from './Register.types';

const Register = ({ onSuccess, onHaveAccountClick }: RegisterProps) => {
  const { t } = useTranslation();

  return (
    <RegisterWrapperStyled>
      <Header />
      <ContentWrapperStyled>
        <RegisterForm onSuccess={onSuccess} />
        <Button
          theme="secondary"
          size="big"
          onClickFn={() => onHaveAccountClick()}
        >
          {t('Have an account?')}
        </Button>
      </ContentWrapperStyled>
      <Footer />
    </RegisterWrapperStyled>
  );
};

export default Register;
