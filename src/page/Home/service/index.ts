import type { UsersData, User } from "@/page/types";
import { rootService } from "@/rootService";

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
