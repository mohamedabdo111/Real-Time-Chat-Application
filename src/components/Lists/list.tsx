import React from "react";
import UserInfo from "./UserInfo/userInfo";
import UserList from "./UserList/userList";
import SearchInput from "./SearchInput/searchInput";

const ListPage = () => {
  return (
    <div className=" flex-1 border-r-[1px] border-gray-400 pr-2 overflow-auto">
      <UserInfo />
      <SearchInput />
      <UserList />
    </div>
  );
};

export default ListPage;
