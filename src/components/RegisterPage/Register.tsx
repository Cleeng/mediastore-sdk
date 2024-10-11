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
      <div>
        <div>MSSDK section start:</div>
        <Button
          onClickFn={() => {
            mssdkSharedEnvFinalTesting();
          }}
        >
          Crash MSSDK
        </Button>
        <Button
          onClickFn={() => {
            Promise.reject(
              new Error(
                'mssdk shared env final testing - Unhandled promise rejection'
              )
            );
          }}
        >
          Throw Unhandled Rejection
        </Button>
        <div>MSSDK section end:</div>
      </div>
      <ContentWrapperStyled>
        <RegisterForm onSuccess={onSuccess} />
        <Button
          variant='secondary'
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
