export interface ISigninState {
  email: string;
  password: string;
}

export interface ISignupState extends ISigninState {
  fullName: string;
}