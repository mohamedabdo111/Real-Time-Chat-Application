import { IChatList, IUserState } from "@/interfaces/interfaces";
import { db } from "@/lib/firebase";
import { useCurrentChat } from "@/lib/useChatState";
import { UseCurrentUser } from "@/lib/useState";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { get } from "http";
import { CircleUser } from "lucide-react";
import React, { useEffect } from "react";
import Image from "next/image";
import usreProfile from "../../../../public/person.png";
const UserList = () => {
  const [chatList, setChatList] = React.useState<any[]>([]);
  const { currentUser } = UseCurrentUser() as IUserState;
  const { fetchCurrentChat } = useCurrentChat() as any;

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userChats", currentUser.uid),
      async (response) => {
        if (response.exists()) {
          const DataArray = response.data().chats;

          const promisess = DataArray.map(async (item: any) => {
            const user = await getDoc(doc(db, "users", item.receiverId));
            const userData = user.data() as any;
            return {
              ...item,
              userData,
            };
          });

          const result = await Promise.all(promisess);
          result.sort((a: any, b: any) => b.updateedAt - a.updateedAt);
          setChatList(result);
        }
      }
    );

    return () => {
      unsub();
    };
  }, [currentUser.uid]);

  const handleSelectChat = async (chat: any) => {
    const allChats = chatList.map((chat: IChatList) => {
      const { userData, ...reset } = chat;

      return reset;
    });

    const getChatIndex = allChats.findIndex(
      (chatIndex: any) => chatIndex.chatId === chat.chatId
    );

    if (allChats.length > 0) {
      console.log(allChats[getChatIndex], "allChats[getChatIndex]");
      allChats[getChatIndex].isSeen = true;
      const chatRef = doc(db, "userChats", currentUser.uid);

      try {
        await updateDoc(chatRef, {
          chats: allChats,
        });
        fetchCurrentChat(chat.chatId, chat.userData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {chatList.map((chat: IChatList, index) => {
        return (
          <div
            className={`flex items-center gap-4 flex-1 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-xl ${
              chat.senderId !== currentUser.uid && !chat.isSeen && "bg-gray-100"
            }`}
            key={index}
            onClick={() => handleSelectChat(chat)}
          >
            <Image
              src={usreProfile}
              width={40}
              height={40}
              alt="avatar"
            ></Image>
            <div className="flex flex-col flex-1 justify-end">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">{chat.userData.userName}</h1>
                <p className="text-gray-500">12m</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 ">{chat.lastMessage}</span>
                {chat.senderId !== currentUser.uid && !chat.isSeen && (
                  <span
                    className={` bg-primary-color  text-white px-[13px] py-1 rounded-full`}
                  >
                    1
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default UserList;
