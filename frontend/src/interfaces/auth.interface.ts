export interface IAuthContext {
  user: IUser | null,
  handleLogin: (user: IUser) => void;
  handleLogout: () => void;
}

export interface IUser { }
