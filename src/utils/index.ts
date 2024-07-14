export const getLocalData = <T>(key: string) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data ?? "{}") as T;
};

export const storeLocalData = (key: string, data: any) => {
  localStorage.setItem(key, data);
};

export const establishWebsocket = (userId: string | undefined) => {
  if (userId) {
    return new WebSocket(
      `wss://5269o35jih.execute-api.eu-north-1.amazonaws.com/staging?userId=${userId}`
    );
  }
  return null;
};
