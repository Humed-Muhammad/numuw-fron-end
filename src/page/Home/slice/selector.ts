import { RootState } from "@/page/types";
import { createSelector } from "@reduxjs/toolkit";

const selectSlice = (state: RootState) => state.chat;

export const selectMessages = createSelector([selectSlice], (chat) => {
  const messages = [...chat.messages];
  const sortedData = messages.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
  return sortedData;
});
export const selectSendMessagePayload = createSelector(
  [selectSlice],
  (chat) => chat.sendMessagePayload
);
