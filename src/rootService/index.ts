// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `http://127.0.0.1:8000/api`;
const token = localStorage.getItem("token") as string;
// initialize an empty api service that we'll inject endpoints into later as needed
export const rootService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  }),
  endpoints: () => ({}),
});
