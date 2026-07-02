export type ConversationUser = {
  id: string;
  displayName: string | null;
  name: string | null;
  image: string | null;
};

export type ConversationListing = {
  id: string;
  title: string;
  image: string;
  description: string | null;
  type: string;
  price: number;
  offerPrice: number | null;
  location: string | null;
};

export type ConversationPreview = {
  id: string;
  otherUser: ConversationUser;
  lastMessage: {
    body: string;
    createdAt: Date;
    senderId: string;
  } | null;
  listing: ConversationListing | null;
  unread: boolean;
  updatedAt: Date;
};

export type ChatMessage = {
  id: string;
  body: string;
  senderId: string;
  createdAt: Date;
};
