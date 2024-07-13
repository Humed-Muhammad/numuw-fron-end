import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ChatState } from "./type";
import type { ChatMessage, MessagePayload } from "@/page/types";

const initialState: ChatState = {
  messages: [],
  sendMessagePayload: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    setSendMessagePayload: (state, action: PayloadAction<MessagePayload>) => {
      state.sendMessagePayload = action.payload;
    },
  },
});

export const { addMessage } = chatSlice.actions;
export const chatReducers = chatSlice.reducer;
