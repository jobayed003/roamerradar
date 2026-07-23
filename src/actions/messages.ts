'use server';

import {
  getMessagesForConversation,
  getOrCreateConversation,
  isConversationParticipant,
  markConversationRead,
} from '@/data/conversation';
import { searchUsers } from '@/data/user';
import { db } from '@/lib/db';
import { notifyRecipientOfMessage } from '@/lib/notification-delivery';
import { requireAuth } from '@/server/auth/require-auth';
import { SendMessageInputSchema, StartConversationSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

export async function sendMessage(conversationId: string, body: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const parsed = SendMessageInputSchema.safeParse({ conversationId, body });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Invalid message' };
  }

  const isParticipant = await isConversationParticipant(
    parsed.data.conversationId,
    authResult.user.id
  );

  if (!isParticipant) {
    return { error: 'Conversation not found' };
  }

  try {
    const message = await db.message.create({
      data: {
        conversationId: parsed.data.conversationId,
        senderId: authResult.user.id,
        body: parsed.data.body,
      },
    });

    await db.conversation.update({
      where: { id: parsed.data.conversationId },
      data: { updatedAt: new Date() },
    });

    void notifyRecipientOfMessage({
      conversationId: parsed.data.conversationId,
      senderId: authResult.user.id,
      body: parsed.data.body,
    });

    revalidatePath('/messages');
    revalidatePath(`/messages/${parsed.data.conversationId}`);

    return {
      success: true,
      message: {
        id: message.id,
        body: message.body,
        senderId: message.senderId,
        createdAt: message.createdAt,
      },
    };
  } catch {
    return { error: 'Failed to send message' };
  }
}

export async function startConversation(otherUserId: string, listingId?: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const parsed = StartConversationSchema.safeParse({ otherUserId, listingId });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Invalid conversation request.' };
  }

  if (authResult.user.id === parsed.data.otherUserId) {
    return { error: 'You cannot message yourself' };
  }

  const otherUser = await db.user.findUnique({ where: { id: parsed.data.otherUserId } });

  if (!otherUser) {
    return { error: 'User not found' };
  }

  if (parsed.data.listingId) {
    const listing = await db.listing.findUnique({ where: { id: parsed.data.listingId } });

    if (!listing) {
      return { error: 'Listing not found' };
    }
  }

  try {
    const conversation = await getOrCreateConversation(
      authResult.user.id,
      parsed.data.otherUserId,
      parsed.data.listingId
    );

    if (!conversation) {
      return { error: 'Unable to start conversation' };
    }

    return { conversationId: conversation.id };
  } catch {
    return { error: 'Failed to start conversation' };
  }
}

export async function fetchMessages(conversationId: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const isParticipant = await isConversationParticipant(conversationId, authResult.user.id);

  if (!isParticipant) {
    return { error: 'Conversation not found' };
  }

  const messages = await getMessagesForConversation(conversationId);

  return { messages };
}

export async function markAsRead(conversationId: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const isParticipant = await isConversationParticipant(conversationId, authResult.user.id);

  if (!isParticipant) {
    return { error: 'Conversation not found' };
  }

  await markConversationRead(conversationId, authResult.user.id);
  revalidatePath('/messages');
  revalidatePath(`/messages/${conversationId}`);

  return { success: true };
}

export async function findUsers(query: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const users = await searchUsers(query, authResult.user.id);

  return { users };
}
