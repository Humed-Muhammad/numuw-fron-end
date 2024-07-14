import { useMemo } from "react";
import { LeftTail, RightTail } from "@/assets";
import { format, toDate } from "date-fns";
import { IconCheck, IconChecks, IconTimeDuration0 } from "@tabler/icons-react";
import type {
  ChatMessage as ChatMessageType,
  LoginResponse,
} from "@/page/types";
import { Label } from "@radix-ui/react-label";
import { getLocalData } from "@/utils";

interface Props {
  chat: ChatMessageType;
}

const LoadingState = {
  sending: <IconTimeDuration0 size={18} className="text-stone-300" />,
  seen: <IconChecks size={18} className="text-green-500" />,
  unread: <IconCheck size={18} className="text-green-500" />,
};

export const ChatMessage = ({ chat }: Props) => {
  const userId = getLocalData<LoginResponse>("user");
  const isSender = useMemo(
    () => userId.userId === chat.senderId,
    [chat?.senderId, userId]
  );

  const message = useMemo(() => chat?.content.value, [chat.content.value]);

  const time = useMemo(() => {
    try {
      if (chat?.createdAt) {
        const utcDate = toDate(chat?.createdAt as any);
        return format(utcDate, "h:mm a");
      }
    } catch (error) {
      return "";
    }
  }, [chat?.createdAt]);
  return (
    <>
      <div
        className={`relative rounded-tr-md rounded-tl-md p-3 h-auto flex items-center ${
          isSender
            ? "pr-8 ml-2 bg-slate-800 self-end"
            : "pr-2 mr-2  bg-[#D9D9D9] self-start"
        } max-w-[582px] min-w-[200px] mb-12`}
      >
        <Label className={`${isSender ? "text-white" : "text-gray-900"}`}>
          {message}
        </Label>
        <div className="absolute right-2 bottom-2">
          {isSender && <>{LoadingState.unread}</>}
        </div>
        {isSender ? (
          <div className="bottom-0 -right-2 absolute">
            <RightTail />
          </div>
        ) : (
          <div className="absolute -left-2 bottom-0">
            <LeftTail />
          </div>
        )}
        <Label
          className={`text-sm text-gray-400 mb-2 ml-2 absolute -bottom-9 ${
            isSender ? "right-0" : "left-0"
          }`}
        >
          {time}
        </Label>
      </div>
    </>
  );
};
