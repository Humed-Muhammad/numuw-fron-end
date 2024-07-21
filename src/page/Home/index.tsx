import { Container } from "@/components/core/Container";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  IconFile,
  IconFileImport,
  IconMessage,
  IconSend,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { ReactInfinite } from "@/components/shared/ReactInfinite";
import { ChatMessage } from "@/components/shared/ChatMessage";
import type { ChatMessage as ChatMessageType } from "../types";
import { Formik } from "formik";

import { useChat } from "@/utils/hooks/useChat";
import { UserTypeMapper } from "@/utils/constants";
import { Badge } from "@/components/ui/badge";
import { useSnapMutation } from "snap-fetch";
import { useRef } from "react";
import { getFileType } from "@/utils";
import { LoadingCircle } from "@/components/shared/icons";
import { SnapInitiator } from "../SnapInitiator";

export const Home = () => {
  const {
    messages,
    otherUsers,
    senderId,
    setRecipientId,
    toast,
    handleFinalSubmit,
    userType,
  } = useChat();

  const { mutate, isLoading } = useSnapMutation<{ uploadedFile: string }>(
    "upload",
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Formik
        initialValues={{
          value: "",
          contentType: "text",
          senderId,
          to: "",
          file: null,
          fileName: "",
        }}
        onSubmit={(payload, { setFieldValue }) => {
          handleFinalSubmit(payload);
          setFieldValue("value", "");
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue, values }) => (
          <Container className="h-screen flex-col w-full md:flex-row">
            <div className="bg-gray-50 w-full md:w-1/3 p-3 h-52 md:h-full flex flex-col">
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
                          <Label className="text-gray-700">
                            {user.username}
                          </Label>
                          <Label className="capitalize text-gray-500">
                            ({user.userType})
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="relative space-y-3 flex flex-col">
                      <IconMessage />
                      {messages.length && !values.to ? (
                        <Badge
                          className="absolute -top-7 -right-3 px-2 rounded-full flex items-center justify-center"
                          variant="destructive"
                        >
                          {messages.length}
                        </Badge>
                      ) : null}
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
              <div className="relative w-full md:w-9/12 flex flex-col justify-between items-center h-screen overflow-hidden">
                <ReactInfinite<ChatMessageType>
                  useScrollToBottom
                  loading={false}
                  dataLength={10}
                  data={messages ?? []}
                  render={(chat) => <ChatMessage chat={chat} />}
                  loadMore={() => console.log("first")}
                />

                <div className="w-full h-20">
                  {values.fileName ? (
                    <div className="flex w-full justify-center mb-2 items-center">
                      <Card className="p-2 w-1/2 flex justify-between items-center">
                        <Label>File: {values.fileName}</Label>
                        <IconFile />
                      </Card>
                      <Button
                        className="ml-3"
                        type="submit"
                        onClick={async () => {
                          const res = await mutate(values.file);

                          setFieldValue("file", null);
                          setFieldValue("fileName", null);
                          handleFinalSubmit({
                            ...values,
                            value: res?.uploadedFile as string,
                          });
                          toast({
                            title: "success",
                            description: "File sent successfully",
                            duration: 2000,
                          });
                        }}
                        variant="outline"
                        size="icon"
                      >
                        {isLoading ? <LoadingCircle /> : <IconSend />}
                      </Button>
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <textarea
                        className="outline-none p-5 w-full border-2 border-gray-100 pr-32"
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
                        <Button
                          onClick={() => inputRef.current?.click()}
                          variant="outline"
                          size="icon"
                        >
                          <IconFileImport />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-9/12 flex flex-col justify-center items-center h-full">
                <Label className="text-2xl text-gray-400">
                  Select a user to chat with
                </Label>
              </div>
            )}
            <input
              ref={inputRef}
              className="hidden"
              name="file"
              onChange={(event) => {
                const file = event.target.files?.[0];
                const formData = new FormData();
                if (file) {
                  formData.append("files", file!);
                }
                setFieldValue("contentType", getFileType(file));
                setFieldValue("fileName", file?.name);
                setFieldValue("file", formData);
              }}
              type="file"
            />
          </Container>
        )}
      </Formik>
      <SnapInitiator />
    </>
  );
};
