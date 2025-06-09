export interface IUserState {
  currentUser: any;
  loading: boolean;
  fetchCurrentUser: (uid: string) => void;
}

export interface IUser {
  createdAt: string;
  email: string;
  userName: string;
  uid: string;
}

export interface IUSerSearch {
  blocked: string[];
  userName: string;
  isTyping: boolean;
  typingUser: string;
  uid: string;
  email: string;
  createdAt: string;
}

export interface IMessageChat {
  senderId: string;
  text: string;
  createdAt: number;
  id: number;
}

export interface IChatList {
  chatId: string;
  lastMessage: string;
  receiverId: string;
  updateedAt: number;
  isSeen: boolean;
  isTypeing: boolean;
  senderId: string;
  userData: IUSerSearch;
  blocked?: string;
}

export interface ICurrentChat {
  chatId: string | null;
  userChat: IUser | null;
  isTyping: boolean;
  isCurrentUserBlocked: boolean;
  isReceivedUserBlocked: boolean;
  chatLoading: boolean;
  chatBetweenTwoUsers: IChatList | null;
  blockUser: () => void;
  logoutState: () => void;
  fetchCurrentChat: (chatId: string, user: IUser) => void;
}

export interface IHandleChatList {
  SelectAnotherChat: () => void;
  selectAnohterChat: boolean;
}
