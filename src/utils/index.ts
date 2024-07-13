import { LoginResponse } from "@/page/types";

export const getLocalData = <T>(key: string) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data ?? "{}") as T;
};

export const storeLocalData = (key: string, data: any) => {
  localStorage.setItem(key, data);
};

// const user = getLocalData<LoginResponse>("user");

export const ws = new WebSocket(
  `wss://5269o35jih.execute-api.eu-north-1.amazonaws.com/staging?userId=53207c20-36f3-4c5b-a403-de10a8004055`
);
