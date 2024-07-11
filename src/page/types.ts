export type LoginPayload = { email: string; password: string };
export type LoginResponse = { token: string };

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
