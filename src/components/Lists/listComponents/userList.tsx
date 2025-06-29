import { IChatList, IUserState } from "@/interfaces/interfaces";
import { db } from "@/lib/firebase";
import { useCurrentChat } from "@/zustand/useChatState";
import { UseCurrentUser } from "@/zustand/useState";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { get } from "http";
import { ChevronDown, CircleUser, Minus, Plus, Search } from "lucide-react";
import React, { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import usreProfile from "../../../../public/person.png";
import { formatRelativeTime } from "@/lib/FormatDate";
import { useHandleList } from "@/zustand/useHandleChatList";
import Modal from "./ModalGetAllUsers";
const UserList = () => {
  const [chatList, setChatList] = React.useState<any[]>([]);
  const { currentUser } = UseCurrentUser() as IUserState;
  const { fetchCurrentChat, fetchUserChat, chatId } = useCurrentChat() as any;
  const { SelectAnotherChat } = useHandleList() as any;
  const [search, setSearch] = useState("");

  // trigger
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userChats", currentUser.uid),
      async (response) => {
        if (response.exists()) {
          const DataArray = response.data().chats;

          const promisess = DataArray?.map(async (item: any) => {
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
          await fetchUserChat(result);
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
      allChats[getChatIndex].isSeen = true;
      const chatRef = doc(db, "userChats", currentUser.uid);

      try {
        if (chatId) SelectAnotherChat();
        await updateDoc(chatRef, {
          chats: allChats,
        });
        fetchCurrentChat(chat.chatId, chat.userData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [showModal, setShowModal] = useState(false);
  const Ref = useRef<HTMLInputElement>(null);

  const handleClickSearch = () => {
    if (Ref.current) {
      Ref.current.focus();
    }
  };

  const filterData = chatList.filter((chat: IChatList) =>
    chat?.userData?.userName
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase())
  );

  return (
    <>
      <>
        <div className=" flex justify-between items-center py-5 border-b-[2px] border-gray-200">
          <div className="flex gap-3 items-end">
            <h1 className="text-xl font-semibold">Messages </h1>
            <ChevronDown />
          </div>

          <div
            className="text-white p-2 rounded-full bg-primary-color cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            {!showModal ? <Plus /> : <Minus />}
          </div>
        </div>
        <div className="flex items-center gap-5 my-2 ">
          <div className="flex items-center flex-1 bg-gray-200 gap-2 px-4 rounded-lg">
            <Search
              className=" cursor-pointer text-gray-400"
              onClick={handleClickSearch}
            />
            <input
              ref={Ref}
              type="text"
              placeholder="Search"
              className="w-full py-[10px] flex-1 border-0 outline-0 "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>

          {showModal && (
            <Modal
              title="Search about users"
              isOpen={showModal}
              setOpen={setShowModal}
              onClose={() => setShowModal(false)}
            />
          )}
        </div>
      </>
      {filterData.map((chat: IChatList, index) => {
        return (
          <div
            className={`flex items-center gap-4 flex-1 px-4 py-2 my-2 cursor-pointer hover:bg-gray-100 rounded-xl ${
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
                {chat.lastMessage !== "" && (
                  <p className="text-gray-500">
                    {formatRelativeTime(chat?.updateedAt)}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span>
                    {chat.lastMessage !== ""
                      ? chat.senderId === currentUser.uid
                        ? "You: "
                        : "him: "
                      : ""}
                  </span>
                  <span className="text-gray-500 ">{chat.lastMessage}</span>
                </div>
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
