import ChatPage from "@/components/Chats/chat";
import DetailsPage from "@/components/Details/details";
import ListPage from "@/components/Lists/list";
import React from "react";

const Home = () => {
  return (
    <div className="w-[90vw] h-[90vh] app rounded-xl p-4 flex gap-3 ">
      <ListPage />
      <ChatPage />
      <DetailsPage />
    </div>
  );
};

export default Home;
