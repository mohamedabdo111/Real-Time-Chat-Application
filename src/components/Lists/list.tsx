import React from "react";
import UserInfo from "./listComponents/userInfo";
import UserList from "./listComponents/userList";
import SearchInput from "./listComponents/searchInput";

const ListUsers = () => {
  return (
    <div className=" flex-1 border-r-[1px] border-gray-400 pr-2 overflow-auto p-4">
      <UserInfo />
      <SearchInput />
      <UserList />
    </div>
  );
};

export default ListUsers;
