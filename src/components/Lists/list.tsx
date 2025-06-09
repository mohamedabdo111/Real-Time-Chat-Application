import React from "react";
import UserInfo from "./listComponents/userInfo";
import UserList from "./listComponents/userList";
import SearchInput from "./listComponents/searchInput";
import { useHandleList } from "@/zustand/useHandleChatList";
import { useCurrentChat } from "@/zustand/useChatState";

const ListUsers = () => {
  const { chatId } = useCurrentChat() as any;
  const { selectAnohterChat } = useHandleList() as any;
  return (
    <div
      className={`absolute top-0 left-0 h-full ${chatId && "left-[-100%] "}  ${
        selectAnohterChat && "!left-0"
      } bg-gray-200 w-full z-10 flex-1 border-r-[1px] duration-300 lg:!relative lg:left-0 lg:bg-white border-gray-400 pr-2 overflow-auto p-4`}
    >
      <UserInfo />
      <SearchInput />
      <UserList />
    </div>
  );
};

export default ListUsers;
