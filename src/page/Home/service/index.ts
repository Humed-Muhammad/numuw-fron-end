import type { User } from "@/page/types";
import { rootService } from "@/rootService";

const loginService = rootService.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<{ data: Array<User> }, string>({
      query: (query) => ({
        url: `/users/?user_type=${query}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery } = loginService;
