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
// import { withErrorBoundary } from 'containers/ErrorBoundary/ErrorBoundaryContainer';

const Register = ({ onSuccess, onHaveAccountClick }: RegisterProps) => {
  const { t } = useTranslation();

  return (
    <RegisterWrapperStyled>
      <Header />
      <ContentWrapperStyled>
        <RegisterForm onSuccess={onSuccess} />
        <Button onClickFn={() => sharedEnvironmentReportingTests()}>
          crash!
        </Button>
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

// export default withErrorBoundary<RegisterProps>(Register);
export default Register;
