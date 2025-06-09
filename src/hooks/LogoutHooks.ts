import { ICurrentChat } from "@/interfaces/interfaces";
import { auth } from "@/lib/firebase";
import { useCurrentChat } from "@/zustand/useChatState";

const logOutHooks = () => {
  const { logoutState } = useCurrentChat() as ICurrentChat;
  const logOut = async () => {
    await auth.signOut();
    logoutState();
  };

  return { logOut };
};

export default logOutHooks;
