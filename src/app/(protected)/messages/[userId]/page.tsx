import Messages from '../_components/Messages';

const ConversationPage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  return <Messages userId={userId} />;
};

export default ConversationPage;
