import { useToast } from "@/components/ui/use-toast";
import { establishWebsocket, getLocalData } from "..";
import { useGenHashKey, useSnapQuery } from "snap-fetch";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMessages } from "@/page/Home/slice/selector";
import type {
  ChatMessage,
  ContentType,
  LoginResponse,
  MessagePayload,
  User,
} from "@/page/types";
import { chatAction } from "@/page/Home/slice";

export const useChat = () => {
  const [recipientId, setRecipientId] = useState("");
  /**@Selectors */
  const messages = useSelector(selectMessages);

  /**@Dispatcher */
  const dispatch = useDispatch();

  /**@Handlers */
  const addNewMessage = useCallback((message: ChatMessage) => {
    dispatch(chatAction.addMessage(message));
  }, []);

  const { toast } = useToast();
  const user = getLocalData<LoginResponse>("user");

  const { data, isError, error } = useSnapQuery<{ data: User[] }>(`users`, {
    filter: { user_type: user.userType === "parent" ? "therapist" : "parent" },
  });

  const messageIdHashValue = useMemo(() => {
    if (user && recipientId) {
      if (user.userType === "parent") {
        return recipientId + user.userId;
      } else {
        return user.userId + recipientId;
      }
    }
  }, [recipientId, user.userId, user.userType]);

  const { hashKey } = useGenHashKey(messageIdHashValue ?? "");

  const chatData = useSnapQuery<{ data: Array<ChatMessage> }>("chats", {
    filter: {
      messageId: hashKey,
    },
    skip: !recipientId && !messageIdHashValue,
  });

  useEffect(() => {
    if (chatData.data?.data) {
      dispatch(chatAction.setAllMessages(chatData.data?.data));
    }
  }, [chatData.data?.data]);

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

  const handleFinalSubmit = useCallback(
    (payload: MessagePayload) => {
      const newMessage = {
        payload,
        to: payload.to,
        userType: user?.userType,
      };
      // For optimistic update
      addNewMessage({
        content: {
          contentType: newMessage.payload.contentType as ContentType,
          value: newMessage.payload.value,
        },
        senderId: newMessage.payload.senderId,
        createdAt: new Date(),
        messageId:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        recipientId: newMessage.to as string,
      });
      sendMessage(JSON.stringify(newMessage));
    },
    [user?.userType]
  );

  return {
    messages,
    otherUsers: data,
    sendMessage,
    addNewMessage,
    senderId: user?.userId,
    userType: user?.userType,
    setRecipientId,
    toast,
    handleFinalSubmit,
  };
};
