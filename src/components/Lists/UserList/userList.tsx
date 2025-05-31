import { IUserState } from "@/interfaces/interfaces";
import { db } from "@/lib/firebase";
import { useCurrentChat } from "@/lib/useChatState";
import { UseCurrentUser } from "@/lib/useState";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { CircleUser } from "lucide-react";
import React, { useEffect } from "react";

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
          setChatList(result);
        }
      }
    );

    return () => {
      unsub();
    };
  }, [currentUser.uid]);

  return (
    <>
      {chatList.map((chat, index) => {
        return (
          <div
            className="flex items-start gap-3 flex-1 px-4 py-2 border-b-[1px] border-gray-400 cursor-pointer"
            key={index}
            onClick={() => fetchCurrentChat(chat.chatId, chat.userData)}
          >
            <CircleUser width={40} height={40} />
            <div className="flex flex-col gap-2">
              <h1 className="text-lg">{chat.userData.userName}</h1>
              <p className=" text-sm">{chat.lastMessage}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default UserList;
