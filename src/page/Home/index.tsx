import { Container } from "@/components/core/Container";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IconFileImport, IconMessage, IconSend } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { ReactInfinite } from "@/components/shared/ReactInfinite";
import { ChatMessage } from "@/components/shared/ChatMessage";
import type { ChatMessage as ChatMessageType, ContentType } from "../types";
import { Formik } from "formik";

import { useChat } from "@/utils/hooks/useChat";
import { UserTypeMapper } from "@/utils/constants";

export const Home = () => {
  const {
    messages,
    otherUsers,
    sendMessage,
    addNewMessage,
    userType,
    senderId,
    setRecipientId,
  } = useChat();

  return (
    <Formik
      initialValues={{
        value: "",
        type: "text",
        senderId,
        to: "",
      }}
      onSubmit={(payload, { setFieldValue }) => {
        const newMessage = {
          payload,
          to: payload.to,
          userType,
        };
        // For optimistic update
        addNewMessage({
          content: {
            type: newMessage.payload.type as ContentType,
            value: newMessage.payload.value,
          },
          senderId: newMessage.payload.senderId,
          createdAt: new Date(),
          messageId:
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15),
          recipientId: newMessage.to,
        });
        sendMessage(JSON.stringify(newMessage));
        setFieldValue("value", "");
      }}
    >
      {({ handleChange, handleSubmit, setFieldValue, values }) => (
        <Container className="h-screen">
          <div className="bg-gray-50 w-1/3 p-3 h-full flex  flex-col">
            <Label className="my-3 text-lg">
              List of {UserTypeMapper[userType]}
            </Label>
            {otherUsers?.data?.length ? (
              otherUsers.data?.map((user) => (
                <Card
                  onClick={() => {
                    setRecipientId(user.userId);
                    setFieldValue("to", user.userId);
                  }}
                  key={user.userId}
                  className={`p-3 px-4 justify-between flex space-y-3 cursor-pointer ${
                    values.to === user.userId ? "bg-purple-200" : ""
                  }`}
                >
                  <div>
                    <div className="space-y-3 flex flex-col">
                      <Label>Name</Label>
                      <div className="flex items-center space-x-2">
                        <Label className="text-gray-700">{user.username}</Label>
                        <Label className="capitalize text-gray-500">
                          ({user.userType})
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="relative space-y-3 flex flex-col">
                    <IconMessage />
                    {/* {messages.length ? (
                      <Badge
                        className="absolute -top-7 -right-3 px-2 rounded-full flex items-center justify-center"
                        variant="destructive"
                      >
                        {messages.length}
                      </Badge>
                    ) : null} */}
                  </div>
                </Card>
              ))
            ) : (
              <Container>
                <Label>No users available</Label>
              </Container>
            )}
          </div>
          {values.to ? (
            <div className="w-9/12 flex flex-col justify-between items-center h-full">
              <div className="w-full flex-grow">
                <ReactInfinite<ChatMessageType>
                  useScrollToBottom
                  loading={false}
                  dataLength={10}
                  data={messages ?? []}
                  render={(chat) => <ChatMessage chat={chat} />}
                  loadMore={() => console.log("first")}
                />
              </div>

              <div className="relative w-full">
                <textarea
                  className="outline-none p-5 h-20 w-full border-2 border-gray-100 "
                  placeholder="Message..."
                  name="value"
                  onChange={handleChange}
                  value={values.value}
                />
                <div className="absolute flex justify-center top-1/2 -translate-y-1/2 right-4 space-x-4">
                  <Button
                    type="submit"
                    onClick={() => handleSubmit()}
                    variant="outline"
                    size="icon"
                  >
                    <IconSend />
                  </Button>
                  <Button variant="outline" size="icon">
                    <IconFileImport />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-9/12 flex flex-col justify-center items-center h-full">
              <Label className="text-2xl text-gray-400">
                Select a user to chat with
              </Label>
            </div>
          )}
        </Container>
      )}
    </Formik>
  );
};
