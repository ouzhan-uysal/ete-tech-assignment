import { ISigninState } from "../types/welcome.interface";

export enum SigninActions {
  SET_EMAIL = "SET_EMAIL",
  SET_PASSWORD = "SET_PASSWORD",
}

export const SigninReducer = (state: ISigninState, action: any) => {
  switch (action.type) {
    case SigninActions.SET_EMAIL:
      return { ...state, email: action.payload.email }

    case SigninActions.SET_PASSWORD:
      return { ...state, password: action.payload.password }

    default:
      return { ...state }
  }
}