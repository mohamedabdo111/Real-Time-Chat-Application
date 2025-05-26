import LoginForm from "@/components/auth/login";
import ChatPage from "@/components/Chats/chat";
import DetailsPage from "@/components/Details/details";
import ListPage from "@/components/Lists/list";
import React from "react";

const Home = () => {
  const user = false;
  return (
    <div className="w-full h-full pb app  p-4 flex gap-3 ">
      {user ? (
        <>
          <ListPage />
          <ChatPage />
          <DetailsPage />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Home;
