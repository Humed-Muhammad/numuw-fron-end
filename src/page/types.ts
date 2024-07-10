export type LoginPayload = { email: string; password: string };
export type LoginResponse = { token: string };

export type User = {
  childrenCount: number;
  email: string;
  userId: string;
  userType: "parent" | "therapist";
  username: string;
};
