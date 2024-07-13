import type { ChatMessage, MessagePayload } from "@/page/types";

export type ChatState = {
  messages: Array<ChatMessage>;
  sendMessagePayload: Partial<MessagePayload>;
};
