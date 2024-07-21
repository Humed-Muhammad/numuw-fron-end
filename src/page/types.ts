import type { ChatState } from "./Home/slice/type";

export type RootState = {
  chat: ChatState;
};

export type LoginPayload = { email: string; password: string };
export type LoginResponse = {
  token: string;
  userId: string;
  userType: "parent" | "therapist";
};

export type User = {
  childrenCount: number;
  email: string;
  userId: string;
  userType: "parent" | "therapist";
  username: string;
};

export type UsersData = { data: Array<User> };

export type Chat = {
  chatId: string;
  messageId: string;
  content: {
    value: string;
    type: "text" | "image" | "video";
  };
  senderId: string;
  recipientId: string;
  createdAt: string | Date;
  readAt: string | Date;
};

export type Message = {
  to: string;
  payload: MessagePayload;
};

export type ContentType = "text" | "image" | "video";

export type MessagePayload = {
  value: string;
  contentType?: string;
  type?: ContentType;
  senderId: string;
  to?: string;
  file?: File | null;
  fileName?: string;
};

export type ChatMessage = {
  id?: string;
  senderId: string;
  recipientId: string;
  content: Omit<MessagePayload, "senderId">;
  messageId: string;
  createdAt: Date;
  readAt?: Date;
  seen?: boolean;
};

export type UpdatedChats = { data: Array<string> };
