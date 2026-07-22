'use server';

import { getPostById } from '@/data/post';
import { db } from '@/lib/db';
import { CreateCommentSchema, CreatePostSchema } from '@/schemas';
import { requireAuth } from '@/server/auth/require-auth';
import { revalidatePath } from 'next/cache';

const MAX_IMAGE_LENGTH = 3_000_000;

export async function createPost(input: unknown) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const parsed = CreatePostSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Invalid post.' };
  }

  const { body, image, listingId } = parsed.data;

  if (image && image.length > MAX_IMAGE_LENGTH) {
    return { error: 'Image is too large. Try a smaller photo.' };
  }

  if (listingId) {
    const listing = await db.listing.findFirst({
      where: { id: listingId, ownerId: authResult.user.id },
      select: { id: true },
    });

    if (!listing) {
      return { error: 'Listing not found.' };
    }
  }

  try {
    const post = await db.post.create({
      data: {
        authorId: authResult.user.id,
        body,
        image: image || null,
        listingId: listingId || null,
      },
    });

    revalidatePath(`/profile/${authResult.user.id}`);

    return { success: 'Post shared.', postId: post.id };
  } catch {
    return { error: 'Unable to create post.' };
  }
}

export async function createComment(input: unknown) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const parsed = CreateCommentSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Invalid comment.' };
  }

  const post = await getPostById(parsed.data.postId);

  if (!post) {
    return { error: 'Post not found.' };
  }

  try {
    await db.comment.create({
      data: {
        postId: parsed.data.postId,
        authorId: authResult.user.id,
        body: parsed.data.body,
      },
    });

    const author = await db.post.findUnique({
      where: { id: parsed.data.postId },
      select: { authorId: true },
    });

    if (author) {
      revalidatePath(`/profile/${author.authorId}`);
    }

    return { success: 'Comment added.' };
  } catch {
    return { error: 'Unable to add comment.' };
  }
}

export async function deletePost(postId: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const post = await getPostById(postId);

  if (!post) {
    return { error: 'Post not found.' };
  }

  if (post.authorId !== authResult.user.id) {
    return { error: 'Forbidden' };
  }

  try {
    await db.post.delete({ where: { id: postId } });
    revalidatePath(`/profile/${authResult.user.id}`);
    return { success: 'Post deleted.' };
  } catch {
    return { error: 'Unable to delete post.' };
  }
}

export async function deleteComment(commentId: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const comment = await db.comment.findUnique({
    where: { id: commentId },
    select: {
      id: true,
      authorId: true,
      postId: true,
      post: { select: { authorId: true } },
    },
  });

  if (!comment) {
    return { error: 'Comment not found.' };
  }

  if (comment.authorId !== authResult.user.id && comment.post.authorId !== authResult.user.id) {
    return { error: 'Forbidden' };
  }

  try {
    await db.comment.delete({ where: { id: commentId } });
    revalidatePath(`/profile/${comment.post.authorId}`);
    return { success: 'Comment deleted.' };
  } catch {
    return { error: 'Unable to delete comment.' };
  }
}
