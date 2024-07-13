import { RootState } from "@/page/types";
import { createSelector } from "@reduxjs/toolkit";

const selectSlice = (state: RootState) => state.chat;

export const selectMessages = createSelector(
  [selectSlice],
  (chat) => chat.messages
);
export const selectSendMessagePayload = createSelector(
  [selectSlice],
  (chat) => chat.sendMessagePayload
);
