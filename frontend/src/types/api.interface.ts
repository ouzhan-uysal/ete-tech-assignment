export interface ISigninPayload {
  email: string;
  password: string;
}

export interface ISigninResponse {
  _id: string;
  fullName: string;
  email: string;
}

export interface ISignupPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface ISignupResponse {
  _id: string;
  fullName: string;
  email: string;
}