import { db } from '@/lib/db';

export type PostWithDetails = {
  id: string;
  body: string;
  image: string | null;
  listingId: string | null;
  createdAt: Date;
  author: {
    id: string;
    displayName: string | null;
    name: string | null;
    realName: string | null;
    image: string | null;
  };
  listing: {
    id: string;
    title: string;
    image: string;
    price: number;
    offerPrice: number | null;
    location: string | null;
  } | null;
  comments: {
    id: string;
    body: string;
    createdAt: Date;
    author: {
      id: string;
      displayName: string | null;
      name: string | null;
      realName: string | null;
      image: string | null;
    };
  }[];
  _count: { comments: number };
};

export async function getPostsByAuthorId(authorId: string): Promise<PostWithDetails[]> {
  try {
    return await db.post.findMany({
      where: { authorId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            displayName: true,
            name: true,
            realName: true,
            image: true,
          },
        },
        listing: {
          select: {
            id: true,
            title: true,
            image: true,
            price: true,
            offerPrice: true,
            location: true,
          },
        },
        comments: {
          orderBy: { createdAt: 'asc' },
          include: {
            author: {
              select: {
                id: true,
                displayName: true,
                name: true,
                realName: true,
                image: true,
              },
            },
          },
        },
        _count: { select: { comments: true } },
      },
    });
  } catch (error) {
    console.error('[getPostsByAuthorId]', error);
    return [];
  }
}

export async function getPostById(postId: string) {
  try {
    return await db.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true },
    });
  } catch {
    return null;
  }
}

export async function getCommentById(commentId: string) {
  try {
    return await db.comment.findUnique({
      where: { id: commentId },
      select: { id: true, authorId: true, postId: true },
    });
  } catch {
    return null;
  }
}
