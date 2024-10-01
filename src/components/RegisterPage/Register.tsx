import {
  ContentWrapperStyled,
  LoginWrapperStyled as RegisterWrapperStyled
} from 'components/LoginPage/LoginStyled';
import Button from 'components/Button';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { useTranslation } from 'react-i18next';
import RegisterForm from './RegisterForm';
import { RegisterProps } from './Register.types';

const Register = ({ onSuccess, onHaveAccountClick }: RegisterProps) => {
  const { t } = useTranslation();

  return (
    <RegisterWrapperStyled>
      <Header />
      <ContentWrapperStyled>
        <RegisterForm onSuccess={onSuccess} />
        <a
          id='crashingLinkaaaaaaaaaaaaa'
          onClick={() => {
            throw new Error('please just start working properly');
          }}
        >
          make a wish (that will not work)
        </a>
        <Button
          theme='secondary'
          size='big'
          onClickFn={() => onHaveAccountClick()}
        >
          {t('register.button.have-an-account', 'Have an account?')}
        </Button>
      </ContentWrapperStyled>
      <Footer />
    </RegisterWrapperStyled>
  );
};

export default Register;
