import AuthWrapper from '@/components/auth/AuthWrapper';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthWrapper
      headerLabel='Register'
      backButtonHref='/auth/login'
      backButtonLabel='Already have an account?'
      showSocial
    >
      <RegisterForm />
    </AuthWrapper>
  );
};

export default RegisterPage;
