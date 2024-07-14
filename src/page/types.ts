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
  type: ContentType;
  senderId: string;
};

export type ChatMessage = {
  senderId: string;
  recipientId: string;
  content: Omit<MessagePayload, "senderId">;
  messageId: string;
  createdAt: Date;
};
