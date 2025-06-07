import { create } from "zustand";
import { ICurrentChat } from "@/interfaces/interfaces";

export const useCurrentChat = create<ICurrentChat>((set) => ({
  chatId: null,
  userChat: null,
  isTyping: false,
  isCurrentUserBlocked: false,
  isReceivedUserBlocked: false,
  chatLoading: true,
  chatBetweenTwoUsers: null,

  logoutState: () => {
    set({
      chatId: null,
      userChat: null,
      isTyping: false,
      isCurrentUserBlocked: false,
      isReceivedUserBlocked: false,
      chatLoading: true,
      chatBetweenTwoUsers: null,
    });
  },

  ChatTypeState: () => {
    set({
      isTyping: true,
    });
  },
  chatTypeStop: () => {
    set({
      isTyping: false,
    });
  },
  blockUser: () => {
    set((state: any) => ({
      ...state,
      isReceivedUserBlocked: !state.isReceivedUserBlocked,
    }));
  },
  fetchCurrentChat: (chatId: string, user: any) => {
    // const currentUsesr = UseCurrentUser?.getState() as any ;
    // const currentUsesrData = currentUsesr?.currentUser as any;
    set({
      chatId,
      userChat: user,
    });
  },

  fetchUserChat: (chatBetweenTwoUsers: any) => {
    set({
      chatBetweenTwoUsers,
    });
  },
}));
