"use client";
import { db } from "@/lib/firebase";
import { useCurrentChat } from "@/lib/useChatState";
import { UseCurrentUser } from "@/lib/useState";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { get } from "http";
import { CircleUser } from "lucide-react";
import React, { useEffect, useRef } from "react";

const ChatContent = () => {
  const DivRef = useRef<HTMLDivElement>(null);
  const {
    chatId,

    userChat,
    isCurrentUserBlocked,
    isReceivedUserBlockked,
    chatLoading,
  } = useCurrentChat() as any;
  const { currentUser } = UseCurrentUser() as any;

  useEffect(() => {
    if (DivRef.current) {
      DivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "chats", "fceaxtbXEEvoG7BAhWqv"),
      (doc) => {
        console.log("current chat", doc.data());
      }
    );

    return () => {
      unsub();
    };
  }, []);
  return (
    <div className="flex-2 py-3">
      {/* first user */}
      <div className="flex gap-2 items-start">
        <CircleUser width={40} height={40} />
        <div className=" max-w-[70%] flex flex-col gap-2">
          <div className="searchParent rounded-xl px-4 py-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
            voluptatem sequi quisquam hic repellat quasi aut dolorum autem vel,
            explicabo architecto voluptatibus, vero totam maiores numquam
            laboriosam quibusdam porro optio?
          </div>

          <p className="text-sm">1 minute</p>
        </div>
      </div>
      <div className="flex gap-2 items-start">
        <CircleUser width={40} height={40} />
        <div className=" max-w-[70%] flex flex-col gap-2">
          <div className="searchParent rounded-xl px-4 py-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
            voluptatem sequi quisquam hic repellat quasi aut dolorum autem vel,
            explicabo architecto voluptatibus, vero totam maiores numquam
            laboriosam quibusdam porro optio?
          </div>

          <p className="text-sm">1 minute</p>
        </div>
      </div>

      {/* second user  */}
      <div className="flex gap-2 items-start justify-end">
        {/* <CircleUser width={40} height={40} /> */}
        <div className=" max-w-[70%] flex flex-col gap-2">
          <div className="bg-blue-500  rounded-xl px-4 py-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
            voluptatem sequi quisquam hic repellat quasi aut dolorum autem vel,
            explicabo architecto voluptatibus, vero totam maiores numquam
            laboriosam quibusdam porro optio?
          </div>

          <p className="text-sm">1 minute</p>
        </div>
      </div>
      {/* <div className="flex gap-2 items-start justify-end">
       
        <div className=" max-w-[70%] flex flex-col gap-2">
          <div className="bg-blue-500  rounded-xl px-4 py-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
            voluptatem sequi quisquam hic repellat quasi aut dolorum autem vel,
            explicabo architecto voluptatibus, vero totam maiores numquam
            laboriosam quibusdam porro optio?
          </div>

          <p className="text-sm">1 minute</p>
        </div>
      </div> */}
      {/* <div className="flex gap-2 items-start justify-end">
       
        <div className=" max-w-[70%] flex flex-col gap-2">
          <div className="bg-blue-500  rounded-xl px-4 py-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
            voluptatem sequi quisquam hic repellat quasi aut dolorum autem vel,
            explicabo architecto voluptatibus, vero totam maiores numquam
            laboriosam quibusdam porro optio?
          </div>

          <p className="text-sm">1 minute</p>
        </div>
      </div> */}

      {/* auto scroll when i open the chat */}
      <div ref={DivRef}></div>
    </div>
  );
};

export default ChatContent;
