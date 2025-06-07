import logOutHooks from "@/hooks/LogoutHooks";
import { auth, db } from "@/lib/firebase";
import { useCurrentChat } from "@/lib/useChatState";
import { UseCurrentUser } from "@/lib/useState";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React from "react";

const Details = () => {
  const { userChat, blockUser, chatBetweenTwoUsers, chatId, logoutState } =
    useCurrentChat() as any;

  const { logOut } = logOutHooks();

  const { currentUser } = UseCurrentUser() as any;

  const handleBlockUser = async () => {
    const userRef = doc(db, "userChats", currentUser?.uid);
    try {
      const findChatBetweenTwoUsersIndex = chatBetweenTwoUsers.findIndex(
        (c: any) => c.chatId === chatId
      );
      if (chatBetweenTwoUsers[findChatBetweenTwoUsersIndex]) {
        chatBetweenTwoUsers[findChatBetweenTwoUsersIndex].blocked = true;
      }

      await updateDoc(userRef, {
        chats: chatBetweenTwoUsers,
      });

      blockUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex-1 p-4 hidden md:flex flex-col justify-between">
      <div className="flex flex-col items-center gap-3  my-4">
        <Image
          src={"/person.png"}
          alt="User image"
          width={100}
          height={100}
          className="rounded-full"
        ></Image>
        <h1 className="text-lg  font-semibold">{userChat?.userName}</h1>
      </div>

      {/* options */}
      <div className="flex flex-col gap-2">
        {/* {isCurrentUserBlocked && (
          <h1 className="bg-red-300 text-gray-800 px-4 py-2 rounded-full w-full text-center cursor-not-allowed">
            You are blocked
          </h1>
        )} */}
        {
          <button
            type="button"
            className="bg-red-400 text-white px-4 py-2 rounded-full w-full cursor-pointer"
            onClick={handleBlockUser}
          >
            block User
          </button>
        }

        <button
          type="button"
          className="bg-gray-300 text-black capitalize px-4 py-2 rounded-full w-full cursor-pointer"
          onClick={logOut}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Details;
