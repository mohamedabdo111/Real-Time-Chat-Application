import { ICurrentChat } from "@/interfaces/interfaces";
import { auth } from "@/lib/firebase";
import { useCurrentChat } from "@/lib/useChatState";
import React from "react";

const logOutHooks = () => {
  const { logoutState } = useCurrentChat() as ICurrentChat;
  const logOut = async () => {
    await auth.signOut();
    logoutState();
  };

  return { logOut };
};

export default logOutHooks;
