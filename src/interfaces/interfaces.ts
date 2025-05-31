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
  uid: string;
  email: string;
  createdAt: string;
}
