import { ReactNode } from "react";

export interface IAuthContext {
  user: IUser | null;
  handleLogin: (user: IUser) => void;
  handleLogout: () => void;
}

export interface IAuthContextProvider {
  children: ReactNode;
}

export interface IUser {
  fullName: string;
  email: string;
  access_token: string;
}