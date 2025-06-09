"use client";
import LoginForm from "@/components/auth/login";
import ChatMessages from "@/components/Chats/chat";
import Details from "@/components/Details/details";
import ListUsers from "@/components/Lists/list";
import { IUserState } from "@/interfaces/interfaces";
import { auth } from "@/lib/firebase";
import { useCurrentChat } from "@/zustand/useChatState";
import { UseCurrentUser } from "@/zustand/useState";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import Loading from "./loading";

const Home = () => {
  const { currentUser, loading, fetchCurrentUser } =
    UseCurrentUser() as IUserState;
  const { chatId } = useCurrentChat() as any;

  useEffect(() => {
    const res = onAuthStateChanged(auth, (user) => {
      fetchCurrentUser(user?.uid || "");
    });
    return () => {
      res();
    };
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="w-full h-full pb app flex gap-3 ">
      {currentUser ? (
        <>
          <ListUsers />
          {chatId && <ChatMessages />}
          {chatId && <Details />}
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Home;
