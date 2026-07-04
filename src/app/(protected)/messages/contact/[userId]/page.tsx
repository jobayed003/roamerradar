import { getOrCreateConversation } from '@/data/conversation';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const ContactPage = async ({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { listing?: string };
}) => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/login?callbackUrl=/messages');
  }

  const { userId: otherUserId } = params;

  if (session.user.id === otherUserId) {
    redirect('/messages');
  }

  const conversation = await getOrCreateConversation(
    session.user.id,
    otherUserId,
    searchParams.listing ?? null
  );

  if (!conversation) {
    redirect('/messages');
  }

  redirect(`/messages/${conversation.id}`);
};

export default ContactPage;
