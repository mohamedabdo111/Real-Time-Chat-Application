import { create } from "zustand";
import { UseCurrentUser } from "./useState";

export const useCurrentChat = create((set) => ({
  chatId: null,
  userChat: null,
  isTyping: false,
  isCurrentUserBlocked: false,
  isReceivedUserBlockked: false,
  chatLoading: true,
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
  fetchCurrentChat: (chatId: string, user: any) => {
    const currentUsesr: any = UseCurrentUser?.getState()?.currentUser as any;

    // If user blocked
    if (currentUsesr.blocked.includes(currentUsesr.uid)) {
      set({
        chatId,
        userChat: null,
        isCurrentUserBlocked: true,
        isReceivedUserBlockked: false,
      });
      // If recevier blocked
    } else if (currentUsesr.blocked.includes(user.id)) {
      set({
        chatId,
        userChat: null,
        isCurrentUserBlocked: false,
        isReceivedUserBlockked: true,
      });
    } else {
      set({
        chatId,
        userChat: user,
        isCurrentUserBlocked: false,
        isReceivedUserBlockked: false,
      });
    }
  },
}));
