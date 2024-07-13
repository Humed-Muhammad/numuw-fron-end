import { getLocalData } from "@/utils";
import { baseURL } from "@/utils/constants";
import { useSetBaseConfiguration } from "snap-fetch";
import type { LoginResponse } from "./types";

export const SnapInitiator = () => {
  const user = getLocalData<LoginResponse>("user");
  useSetBaseConfiguration({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: user?.token,
    },
  });
  return null;
};
