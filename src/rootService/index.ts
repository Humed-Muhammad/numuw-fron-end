import type { LoginResponse } from "@/page/types";
import { getLocalData } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `http://127.0.0.1:8000/api`;
const user = getLocalData<LoginResponse>("user");
export const rootService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: user?.token,
    },
  }),
  endpoints: () => ({}),
});
