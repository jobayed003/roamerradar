import { db } from '@/lib/db';
import type { ChatMessage, ConversationPreview } from '@/types/conversation';

const userSelect = {
  id: true,
  displayName: true,
  name: true,
  image: true,
} as const;

const listingSelect = {
  id: true,
  title: true,
  image: true,
  description: true,
  type: true,
  price: true,
  offerPrice: true,
  location: true,
} as const;

export async function getConversationsForUser(userId: string): Promise<ConversationPreview[]> {
  const conversations = await db.conversation.findMany({
    where: {
      participants: { some: { userId } },
    },
    include: {
      participants: {
        include: { user: { select: userSelect } },
      },
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
      listing: { select: listingSelect },
    },
    orderBy: { updatedAt: 'desc' },
  });

  return conversations.map((conversation) => {
    const currentParticipant = conversation.participants.find((p) => p.userId === userId);
    const otherParticipant = conversation.participants.find((p) => p.userId !== userId);
    const lastMessage = conversation.messages[0] ?? null;

    const unread =
      !!lastMessage &&
      lastMessage.senderId !== userId &&
      (!currentParticipant?.lastReadAt || lastMessage.createdAt > currentParticipant.lastReadAt);

    return {
      id: conversation.id,
      otherUser: otherParticipant?.user ?? {
        id: 'unknown',
        displayName: 'Unknown user',
        name: null,
        image: null,
      },
      lastMessage: lastMessage
        ? {
            body: lastMessage.body,
            createdAt: lastMessage.createdAt,
            senderId: lastMessage.senderId,
          }
        : null,
      listing: conversation.listing,
      unread,
      updatedAt: conversation.updatedAt,
    };
  });
}

export async function getConversationForUser(conversationId: string, userId: string) {
  const conversation = await db.conversation.findFirst({
    where: {
      id: conversationId,
      participants: { some: { userId } },
    },
    include: {
      participants: {
        include: { user: { select: userSelect } },
      },
      listing: { select: listingSelect },
    },
  });

  return conversation;
}

export async function getMessagesForConversation(conversationId: string): Promise<ChatMessage[]> {
  const messages = await db.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      body: true,
      senderId: true,
      createdAt: true,
    },
  });

  return messages;
}

export async function getOrCreateConversation(
  userId: string,
  otherUserId: string,
  listingId?: string | null
) {
  if (userId === otherUserId) {
    return null;
  }

  const normalizedListingId = listingId ?? null;

  const existingConversations = await db.conversation.findMany({
    where: {
      listingId: normalizedListingId,
      AND: [
        { participants: { some: { userId } } },
        { participants: { some: { userId: otherUserId } } },
      ],
    },
    include: { participants: true },
  });

  const existing = existingConversations.find((conversation) => conversation.participants.length === 2);

  if (existing) {
    return existing;
  }

  return db.conversation.create({
    data: {
      listingId: normalizedListingId,
      participants: {
        create: [{ userId }, { userId: otherUserId }],
      },
    },
  });
}

export async function markConversationRead(conversationId: string, userId: string) {
  await db.conversationParticipant.updateMany({
    where: { conversationId, userId },
    data: { lastReadAt: new Date() },
  });
}

export async function isConversationParticipant(conversationId: string, userId: string) {
  const participant = await db.conversationParticipant.findFirst({
    where: { conversationId, userId },
  });

  return !!participant;
}
