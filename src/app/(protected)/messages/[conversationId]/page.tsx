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

  const [conversation, conversations, messages] = await Promise.all([
    getConversationForUser(conversationId, session.user.id),
    getConversationsForUser(session.user.id),
    getMessagesForConversation(conversationId),
  ]);

  if (!conversation) {
    notFound();
  }

  // Non-blocking: client also marks read on open; avoid delaying first paint.
  void markConversationRead(conversationId, session.user.id);

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
