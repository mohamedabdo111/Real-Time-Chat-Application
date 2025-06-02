"use client";
import { IMessageChat } from "@/interfaces/interfaces";
import { db } from "@/lib/firebase";
import { useCurrentChat } from "@/lib/useChatState";
import { UseCurrentUser } from "@/lib/useState";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { CircleUser } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import usreProfile from "../../../../public/person.png";
const ChatContent = () => {
  const DivRef = useRef<HTMLDivElement>(null);
  const { chatId } = useCurrentChat() as any;
  const { currentUser } = UseCurrentUser() as any;
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (DivRef.current) {
      DivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      console.log("current chattt", doc.data());
      if (doc.exists()) {
        const chatData = doc.data();
        const cahtMessage = chatData?.messages;
        setChatMessages(cahtMessage);
      }
    });

    return () => {
      unsub();
    };
  }, [chatId]);
  return (
    <div className="flex-2 py-3">
      {/* first user */}
      {chatMessages.map((item: IMessageChat, index) => {
        return item.senderId !== currentUser.uid ? (
          <div className="flex gap-2 my-3 items-start" key={index}>
            <Image
              src={usreProfile}
              width={40}
              height={40}
              alt="avatar"
            ></Image>
            <div className=" max-w-[70%] flex flex-col gap-1 ">
              <div className="bg-gray-200 rounded-xl px-4 py-2">
                {item.text}
              </div>

              <p className="text-sm">1 minute</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 my-3 items-start justify-end" key={index}>
            {/* <CircleUser width={40} height={40} /> */}
            <div className=" max-w-[70%] flex flex-col gap-1 items-end">
              <div className="bg-primary-color text-white  rounded-xl px-4 py-2">
                {item.text}
              </div>

              <p className="text-sm">1 minute</p>
            </div>
          </div>
        );
      })}

      <div ref={DivRef}></div>
    </div>
  );
};

export default ChatContent;
