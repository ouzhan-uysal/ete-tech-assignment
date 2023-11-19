import { ISignupState } from "../types/welcome.interface";

export enum SignupActions {
  SET_FULLNAME = "SET_FULLNAME",
  SET_EMAIL = "SET_EMAIL",
  SET_PASSWORD = "SET_PASSWORD",
}

export const SignupReducer = (state: ISignupState, action: any) => {
  switch (action.type) {
    case SignupActions.SET_FULLNAME:
      return { ...state, fullName: action.payload.fullName }

    case SignupActions.SET_EMAIL:
      return { ...state, email: action.payload.email }

    case SignupActions.SET_PASSWORD:
      return { ...state, password: action.payload.password }

    default:
      return { ...state }
  }
}