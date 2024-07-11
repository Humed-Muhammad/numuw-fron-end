import { Container } from "@/components/core/Container";
import { useGetUsersQuery } from "./service";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IconFileImport, IconMessage, IconSend } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ReactInfinite } from "@/components/shared/ReactInfinite";
import { ChatMessage } from "@/components/shared/ChatMessage";
import { Chat } from "../types";

export const Home = () => {
  const { toast } = useToast();
  const { data, isError, error } = useGetUsersQuery("parent", { skip: false });

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        variant: "default",
        description: error.message ?? "Something on owr side went wrong!",
        className: "border border-red-100 text-red-500",
      });
    }
  }, [isError]);

  return (
    <Container className="h-screen">
      <div className="bg-gray-100 w-1/3 p-3 h-full flex  flex-col">
        <Label className="my-3 text-lg">List of Parents</Label>
        {data?.length ? (
          data?.map((user) => (
            <Card
              key={user.userId}
              className="p-3 px-4 justify-between flex space-y-3 cursor-pointer"
            >
              <div className="space-y-3 flex flex-col">
                <Label>Name</Label>
                <Label className="text-gray-400">{user.username}</Label>
              </div>
              <div className="space-y-3 flex flex-col">
                <IconMessage />
              </div>
            </Card>
          ))
        ) : (
          <Container>
            <Label>No users available</Label>
          </Container>
        )}
      </div>
      <div className="w-9/12 flex flex-col justify-between items-center h-full">
        <div className="w-full flex-grow">
          <ReactInfinite<Chat>
            useScrollToBottom
            loading={false}
            dataLength={10}
            data={[
              {
                content: {
                  value:
                    "Hello there! how are you ding to day, I was wondering if we can have a discussion, about mahir and hist current progress",
                  type: "text",
                },
                senderId: "123",
                chatId: "234",
                createdAt: new Date(),
                readAt: new Date(),
                recipientId: "345",
                messageId: "789",
              },
              {
                content: { value: "Hello there!", type: "text" },
                senderId: "123",
                chatId: "234",
                createdAt: new Date(),
                readAt: new Date(),
                recipientId: "345",
                messageId: "789",
              },
              {
                content: { value: "Hello there!", type: "text" },
                senderId: "123",
                chatId: "234",
                createdAt: new Date(),
                readAt: new Date(),
                recipientId: "345",
                messageId: "789",
              },
            ]}
            render={(chat, index) => <ChatMessage chat={chat} />}
            loadMore={() => console.log("first")}
          />
        </div>
        <div className="relative w-full">
          <textarea
            className="outline-none p-5 h-20 w-full border-2 border-gray-100 "
            placeholder="Message..."
          />
          <div className="absolute flex justify-center top-1/2 -translate-y-1/2 right-4 space-x-4">
            <Button variant="outline" size="icon">
              <IconSend />
            </Button>
            <Button variant="outline" size="icon">
              <IconFileImport />
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
