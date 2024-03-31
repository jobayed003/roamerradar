import AuthWrapper from '@/components/auth/AuthWrapper';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <AuthWrapper
      headerLabel='Login'
      backButtonHref='/auth/register'
      backButtonLabel={"Dont' have an account?"}
      showSocial
    >
      <LoginForm />
    </AuthWrapper>
  );
};

export default LoginPage;
