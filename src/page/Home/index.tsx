import { Container } from "@/components/core/Container";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IconFileImport, IconMessage, IconSend } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ReactInfinite } from "@/components/shared/ReactInfinite";
import { ChatMessage } from "@/components/shared/ChatMessage";
import type {
  ChatMessage as ChatMessageType,
  LoginResponse,
  User,
} from "../types";
import { getLocalData, ws } from "@/utils";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { selectMessages } from "./slice/selector";
import { useSnapQuery } from "snap-fetch";

export const Home = () => {
  const { toast } = useToast();
  const [to, setTo] = useState("");
  const user = getLocalData<LoginResponse>("user");

  const { data, isError, error } = useSnapQuery<{ data: User[] }>(
    `users?user_type=parent`
  );

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

  useEffect(() => {
    if (user?.userId) {
      ws.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.onmessage = (event) => {
        console.log(event);
        // const message = JSON.parse(event.data);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };
    }
    return () => {
      console.log("closing");
      // ws.close();
    };
  }, [user?.userId]);

  const messages = useSelector(selectMessages);

  return (
    <Container className="h-screen">
      <div className="bg-gray-100 w-1/3 p-3 h-full flex  flex-col">
        <Label className="my-3 text-lg">List of Parents</Label>
        {data?.data?.length ? (
          data.data?.map((user) => (
            <Card
              onClick={() => setTo("53207c20-36f3-4c5b-a403-de10a8004055")}
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
          <ReactInfinite<ChatMessageType>
            useScrollToBottom
            loading={false}
            dataLength={10}
            data={messages}
            render={(chat) => <ChatMessage chat={chat} />}
            loadMore={() => console.log("first")}
          />
        </div>
        <Formik
          initialValues={{ value: "", type: "text", senderId: "5467890-" }}
          onSubmit={(payload) => {
            // console.log({ to, payload });
            ws.send(
              JSON.stringify({
                to: "53207c20-36f3-4c5b-a403-de10a8004055",
                payload,
              })
            );
          }}
        >
          {({ handleChange, handleSubmit }) => (
            <div className="relative w-full">
              <textarea
                className="outline-none p-5 h-20 w-full border-2 border-gray-100 "
                placeholder="Message..."
                name="value"
                onChange={handleChange}
              />
              <div className="absolute flex justify-center top-1/2 -translate-y-1/2 right-4 space-x-4">
                <Button
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
          )}
        </Formik>
      </div>
    </Container>
  );
};
