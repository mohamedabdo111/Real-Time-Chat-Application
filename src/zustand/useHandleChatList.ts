import { IHandleChatList } from "@/interfaces/interfaces";
import { create } from "zustand";

export const useHandleList = create<IHandleChatList>((set) => ({
  selectAnohterChat: false,

  SelectAnotherChat: () => {
    set((state: any) => ({
      selectAnohterChat: !state.selectAnohterChat,
    }));
  },
}));
