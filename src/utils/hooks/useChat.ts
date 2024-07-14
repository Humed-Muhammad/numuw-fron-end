import { useToast } from "@/components/ui/use-toast";
import { establishWebsocket, getLocalData } from "..";
import { useSnapQuery } from "snap-fetch";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMessages } from "@/page/Home/slice/selector";
import type { ChatMessage, LoginResponse, User } from "@/page/types";
import { addMessage } from "@/page/Home/slice";

export const useChat = () => {
  /**@Selectors */
  const messages = useSelector(selectMessages);

  /**@Dispatcher */
  const dispatch = useDispatch();

  /**@Handlers */
  const addNewMessage = useCallback((message: ChatMessage) => {
    dispatch(addMessage(message));
  }, []);

  const { toast } = useToast();
  const user = getLocalData<LoginResponse>("user");

  const { data, isError, error } = useSnapQuery<{ data: User[] }>(`users`, {
    filter: { user_type: user.userType === "parent" ? "therapist" : "parent" },
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        variant: "default",
        description: error?.message ?? "Something on owr side went wrong!",
        className: "border border-red-100 text-red-500",
      });
    }
  }, [isError]);

  const websocketConnection = useMemo(
    () => establishWebsocket(user?.userId),
    [user?.userId]
  );
  useEffect(() => {
    if (websocketConnection) {
      websocketConnection.onopen = () => {
        console.log(user?.userId, "WebSocket connection established");
      };

      websocketConnection.onmessage = (event) => {
        const message = JSON.parse(event.data);
        addNewMessage(message);
      };

      websocketConnection.onerror = () => {
        toast({
          title: "Error",
          variant: "default",
          description: "Socket error",
          className: "border border-red-100 text-red-500",
        });
      };

      websocketConnection.onclose = () => {
        console.log("WebSocket connection closed");
      };
    }
  }, [websocketConnection]);

  const sendMessage = (message: string) => {
    websocketConnection?.send(message);
  };

  return {
    messages,
    otherUsers: data,
    sendMessage,
    addNewMessage,
    senderId: user.userId,
  };
};
