import { getConversationsForUser } from '@/data/conversation';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import MessagesLayout from './_components/MessagesLayout';

const MessagePage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/login?callbackUrl=/messages');
  }

  const conversations = await getConversationsForUser(session.user.id);

  return (
    <MessagesLayout
      conversations={conversations}
      activeConversationId={null}
      messages={[]}
      currentUserId={session.user.id}
      otherUser={null}
      listing={null}
    />
  );
};

export default MessagePage;
