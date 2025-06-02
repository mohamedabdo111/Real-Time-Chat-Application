import { IUserState } from "@/interfaces/interfaces";
import { UseCurrentUser } from "@/lib/useState";
import { CircleUser, Ellipsis, SquarePen, Video } from "lucide-react";

const UserInfo = () => {
  const { currentUser } = UseCurrentUser() as IUserState;
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <CircleUser width={40} height={40} />
        <h1 className=" font-semibold text-lg">{currentUser?.userName}</h1>
      </div>
      <div className=" flex gap-4 items-center">
        <Ellipsis className=" cursor-pointer" />
        <Video className=" cursor-pointer" />
        <SquarePen className=" cursor-pointer" />
      </div>
    </div>
  );
};

export default UserInfo;
