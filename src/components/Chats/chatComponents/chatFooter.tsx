"use client";
import { db } from "@/lib/firebase";
import { useCurrentChat } from "@/lib/useChatState";
import { UseCurrentUser } from "@/lib/useState";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Camera, ImagePlus, Mic, SmilePlus } from "lucide-react";
import React, { useEffect } from "react";

const ChatFooter = () => {
  const [show, setShow] = React.useState(false);
  const { currentUser } = UseCurrentUser() as any;
  const { chatId, userChat, ChatTypeState, chatTypeStop } =
    useCurrentChat() as any;

  const [text, setText] = React.useState("");
  const userIDs = [currentUser?.uid, userChat.uid];

  useEffect(() => {
    if (text === "") {
      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "users", id);
        const getUserChats = await getDoc(userChatRef);
        const getUserChatsData = getUserChats.data();

        if (getUserChats.exists()) {
          if (getUserChatsData) {
            getUserChatsData.isTyping = false;

            await updateDoc(userChatRef, getUserChatsData);
          }
        }
      });
    }
  }, [text]);

  // when user type message
  const onChangeInput = async (e: any) => {
    setText(e.target.value);

    if (e.target.value !== "") {
      userIDs.forEach(async (id) => {
        if (id === currentUser.uid) {
          // Don't update our own document
          const userChatRef = doc(db, "users", id);
          await updateDoc(userChatRef, {
            isTyping: true,
            typingUser: currentUser.uid, // Track who is typing
          });
        }
      });
    }
  };

  const handleSendMessage = async () => {
    const chatCollection = collection(db, "chats");
    const chatRef = doc(chatCollection, chatId);
    if (text === "") return;
    try {
      await updateDoc(chatRef, {
        messages: arrayUnion({
          id: Date.now(),
          senderId: currentUser?.uid,
          text,
          createdAt: Date.now(),
        }),
      });

      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userChats", id);

        const usersChat = await getDoc(userChatRef);

        if (usersChat?.exists()) {
          const userData = usersChat.data();
          const getChatIndex = userData?.chats.findIndex(
            (chat: any) => chat.chatId === chatId
          );

          if (userData?.chats[getChatIndex]) {
            userData.chats[getChatIndex].lastMessage = text;
            userData.chats[getChatIndex].updateedAt = Date.now();
            userData.chats[getChatIndex].isSeen =
              id === currentUser?.uid ? true : false;

            await updateDoc(userChatRef, {
              chats: userData.chats,
            });
          }

          // userData?[getChatIndex].lastMessage = text;
          // userData?.chats[getChatIndex].updateedAt = Date.now();
        }
      });

      setText("");
    } catch (error) {
      console.log("errorrr", error);
    }
  };

  return (
    <div className="border-t-[1px] border-gray-400 pt-2 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <ImagePlus />
        <Camera />
        <Mic />
      </div>
      <div className="flex-2">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full searchParent gap-2 px-4 py-2 rounded-xl flex-1 border-0 outline-0 searchParent"
          onChange={onChangeInput}
          value={text}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <SmilePlus
            className="cursor-pointer relative"
            onClick={() => setShow((prev) => !prev)}
          />

          <div className="absolute bottom-[50px] right-0 ">
            <EmojiPicker
              open={show}
              onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
            />
          </div>
        </div>

        <button
          className={`gap-2 px-4 py-2 rounded-xl   ${
            text === ""
              ? "cursor-not-allowed bg-blue-500 opacity-30 hover:opacity-15"
              : "cursor-pointer bg-blue-500"
          }`}
          type="submit"
          onClick={handleSendMessage}
          disabled={text === ""}
        >
          Send
        </button>
        {/* <button
          className={`gap-2 px-4 py-2 rounded-xl   ${
            text === ""
              ? "cursor-not-allowed bg-blue-500 opacity-30 hover:opacity-15"
              : "cursor-pointer bg-blue-500"
          }`}
          type="submit"
          onClick={updateMessage}
          disabled={text === ""}
        >
          update
        </button> */}
      </div>
    </div>
  );
};

export default ChatFooter;
