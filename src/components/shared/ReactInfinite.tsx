import { useCallback, useEffect, useRef, useState } from "react";

import { debounce } from "lodash";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { IconArrowDown } from "@tabler/icons-react";

interface Props<T> {
  useScrollToBottom?: boolean;
  disableMountScrollToBottom?: boolean;
  data: Array<T>;
  dataLength: number;
  render: (item: T, index: number) => React.ReactNode;
  loading?: boolean;
  loadMore: () => void;
}

export const ReactInfinite = <T,>({
  data,
  render,
  disableMountScrollToBottom,
  useScrollToBottom,
  loadMore,
  loading,
  dataLength,
}: Props<T>) => {
  if (!Array.isArray(data)) {
    throw new Error("ReactInfinite *data* required to be an array");
  }

  if (typeof render !== "function") {
    throw new Error(
      "ReactInfinite **render** required to be a function that returns a ReactNode instance"
    );
  }
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = "instant") => {
      messageContainerRef.current?.lastElementChild?.scrollIntoView({
        behavior,
        block: "center",
      });
    },
    [
      JSON.stringify(data),
      messageContainerRef.current?.lastElementChild?.textContent,
    ]
  );

  useEffect(() => {
    if (!disableMountScrollToBottom) {
      messageContainerRef.current?.lastElementChild?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
    } else {
      scrollToBottom();
    }
  }, [
    messageContainerRef.current?.lastElementChild?.textContent,
    disableMountScrollToBottom,
    scrollToBottom,
  ]);

  const handleLoadMore = useCallback(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        messageContainerRef.current &&
        messageContainerRef.current.scrollTop <= 50 &&
        !loading &&
        data?.length < dataLength
      ) {
        handleLoadMore();
        // messageContainerRef.current?.scrollTo({
        //   behavior: "smooth",
        //   top: 300,
        // });
      }

      const scrollHeight = messageContainerRef.current?.scrollHeight || 0;
      const scrollTop = messageContainerRef.current?.scrollTop || 0;
      const clientHeight = messageContainerRef.current?.clientHeight || 0;
      const shouldShowScrollToBottom =
        scrollHeight - scrollTop - clientHeight > 100; // Adjust the threshold as needed

      setShowScrollToBottom(shouldShowScrollToBottom);
    }, 100);

    messageContainerRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      messageContainerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [loading, dataLength, JSON.stringify(loadMore)]);

  return (
    <div
      className="flex-grow overflow-y-auto px-4 py-6 w-full h-[calc(100vh-200px)]"
      ref={messageContainerRef}
    >
      {loading && <Label className="opacity-50 absolute">Loading...</Label>}
      {showScrollToBottom && useScrollToBottom && (
        <Button
          className="absolute border border-green-400 right-5 bottom-52 rounded-full h-9 w-9 z-10"
          variant="outline"
          size="icon"
          onClick={() => scrollToBottom()}
        >
          <IconArrowDown className="text-gray-800" />
        </Button>
      )}
      {data.map((item, index) => render(item, index))}
    </div>
  );
};
