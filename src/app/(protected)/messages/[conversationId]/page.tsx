import {
  getConversationForUser,
  getConversationsForUser,
  getMessagesForConversation,
  markConversationRead,
} from '@/data/conversation';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import MessagesLayout from '../_components/MessagesLayout';

const ConversationPage = async ({ params }: { params: { conversationId: string } }) => {
  const session = await auth();

  if (!session?.user?.id) {
    notFound();
  }

  const { conversationId } = params;
  const conversation = await getConversationForUser(conversationId, session.user.id);

  if (!conversation) {
    notFound();
  }

  await markConversationRead(conversationId, session.user.id);

  const [conversations, messages] = await Promise.all([
    getConversationsForUser(session.user.id),
    getMessagesForConversation(conversationId),
  ]);

  const otherUser = conversation.participants.find((p) => p.userId !== session.user.id)?.user;

  return (
    <MessagesLayout
      conversations={conversations}
      activeConversationId={conversationId}
      messages={messages}
      currentUserId={session.user.id}
      otherUser={otherUser ?? null}
      listing={conversation.listing}
    />
  );
};

export default ConversationPage;
