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
import {
  Camera,
  ImagePlus,
  Mic,
  Paperclip,
  Send,
  SmilePlus,
} from "lucide-react";
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

  const handleSendMessage = async (e : React.FormEvent) => {
    e.preventDefault();
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
          isSeen: false,
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
            userData.chats[getChatIndex].senderId = currentUser?.uid;

            try {
              await updateDoc(userChatRef, {
                chats: userData.chats,
              });
              setText("");
            } catch (error) {
              console.log(error);
            }
          }
        }
      });
    } catch (error) {
      console.log("errorrr", error);
    }
  };

  return (
    <div className="border-t-[1px] border-gray-300 pt-2 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Paperclip className="text-gray-400" />
      </div>
      <form onSubmit={handleSendMessage} className="flex-2 relative">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full border-[2px] border-gray-300 gap-2 px-4 py-2 rounded-xl flex-1  outline-0 relative "
          onChange={onChangeInput}
          value={text}
        />

        <div className="flex items-center gap-4 absolute right-5 top-[50%] translate-y-[-50%]">
          <div className="relative">
            <SmilePlus
              className="cursor-pointer relative text-gray-400"
              onClick={() => setShow((prev) => !prev)}
            />

            <div className="absolute bottom-[50px] right-0 ">
              <EmojiPicker
                open={show}
                onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
              />
            </div>
          </div>

          <button type="submit" disabled={text === ""}>
            <Send
              className={`gap-2    ${
                text === ""
                  ? "cursor-not-allowed text-primary-color hover:opacity-50 "
                  : "cursor-pointer text-primary-color"
              }`}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatFooter;
