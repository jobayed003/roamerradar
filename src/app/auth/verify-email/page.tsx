import AuthWrapper from '@/components/auth/AuthWrapper';
import VerificationForm from '@/components/auth/VerificationForm';

const VerificationPage = () => {
  return (
    <AuthWrapper headerLabel='Verify Email' backButtonHref='/' backButtonLabel='Back to home'>
      <VerificationForm />
    </AuthWrapper>
  );
};

export default VerificationPage;
