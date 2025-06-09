import logOutHooks from "@/hooks/LogoutHooks";
import { IUserState } from "@/interfaces/interfaces";
import { useCurrentChat } from "@/zustand/useChatState";
import { useHandleList } from "@/zustand/useHandleChatList";
import { UseCurrentUser } from "@/zustand/useState";
import { CircleUser, LogOut, MessageCircle } from "lucide-react";
import { use } from "react";

const UserInfo = () => {
  const { currentUser } = UseCurrentUser() as IUserState;
  const { SelectAnotherChat } = useHandleList() as any;
  const { chatId } = useCurrentChat() as any;
  const { logOut } = logOutHooks();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <CircleUser width={40} height={40} />
        <h1 className=" font-semibold text-lg">{currentUser?.userName}</h1>
      </div>
      <div className=" flex gap-4 items-center">
        <LogOut onClick={logOut} className=" cursor-pointer text-red-400" />
        {/* <Video className=" cursor-pointer" /> */}
        {/* <SquarePen className=" cursor-pointer" /> */}

        {chatId && (
          <MessageCircle
            className=" cursor-pointer lg:hidden"
            onClick={SelectAnotherChat}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfo;
