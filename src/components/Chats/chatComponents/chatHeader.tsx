import { db } from "@/lib/firebase";
import { useCurrentChat } from "@/zustand/useChatState";
import { useHandleList } from "@/zustand/useHandleChatList";
import { doc, onSnapshot } from "firebase/firestore";
import {
  AlignJustify,
  CircleUser,
  Ellipsis,
  List,
  SquarePen,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";

const ChatHeader = () => {
  const [chatHeader, setChatHeader] = useState<any | null>(null);
  const { userChat } = useCurrentChat() as any;
  const { SelectAnotherChat } = useHandleList() as any;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", userChat?.uid), (doc) => {
      setChatHeader(doc.data());
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2 ">
      <div className="flex gap-2 items-center">
        <CircleUser width={40} height={40} />
        <div className="flex flex-col ">
          <h1 className=" font-semibold text-lg">{userChat?.userName}</h1>
          <p className="text-sm">
            {chatHeader?.uid === userChat?.uid
              ? chatHeader?.isTyping
                ? "Typing..."
                : ""
              : ""}
          </p>
        </div>
      </div>
      <div className=" flex gap-4 items-center">
        <Ellipsis className=" cursor-pointer" />

        <SquarePen className=" cursor-pointer" />
        <AlignJustify
          className=" cursor-pointer lg:hidden"
          onClick={SelectAnotherChat}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
