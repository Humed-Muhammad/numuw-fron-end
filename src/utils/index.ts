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

export const getFileType = (file: File | undefined): "video" | "image" => {
  if (file?.type.startsWith("video/")) {
    return "video";
  } else if (file?.type.startsWith("image/")) {
    return "image";
  } else {
    // Default to "image" if the type is not recognized
    return "image";
  }
};
