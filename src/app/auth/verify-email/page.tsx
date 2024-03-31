import AuthWrapper from '@/components/auth/AuthWrapper';
import VerificationForm from '@/components/auth/VerificationForm';

const VerificationPage = () => {
  return (
    <AuthWrapper headerLabel='Verify Email' backButtonHref='/auth/login' backButtonLabel='Back to login'>
      <VerificationForm />
    </AuthWrapper>
  );
};

export default VerificationPage;
