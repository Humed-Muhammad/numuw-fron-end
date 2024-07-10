import type { LoginResponse, LoginPayload } from "@/page/types";
import { rootService } from "@/rootService";

const loginService = rootService.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({
        url: "/login/",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = loginService;
