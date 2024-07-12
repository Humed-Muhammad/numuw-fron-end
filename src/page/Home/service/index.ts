import type { UsersData, User } from "@/page/types";
import { rootService } from "@/rootService";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const loginService = rootService.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], string>({
      query: (query) => ({
        url: `/users/?user_type=${query}`,
        method: "GET",
      }),
      transformResponse(baseQueryReturnValue: UsersData) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery } = loginService;

export const chatApi = rootService.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (message) => ({
        url: "wss://5269o35jih.execute-api.eu-north-1.amazonaws.com/staging/",
        method: "SEND",
        headers: {
          "Content-Type": "application/json",
        },
        body: message,
      }),
    }),
    listenToMessages: builder.query({
      query: () =>
        "wss://5269o35jih.execute-api.eu-north-1.amazonaws.com/staging/",
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket(
          "wss://5269o35jih.execute-api.eu-north-1.amazonaws.com/staging/"
        );

        ws.onopen = () => {
          console.log("WebSocket connection established");
        };

        ws.onmessage = (event) => {
          const message = JSON.parse(event.data);
          updateCachedData((draft) => {
            draft.push(message);
          });
        };

        ws.onclose = () => {
          console.log("WebSocket connection closed");
        };

        await cacheDataLoaded;

        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useSendMessageMutation, useListenToMessagesQuery } = chatApi;
