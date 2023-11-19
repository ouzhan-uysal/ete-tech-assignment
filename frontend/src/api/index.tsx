import axios, { AxiosResponse } from "axios";
import { ISigninPayload, ISigninResponse, ISignupPayload, ISignupResponse } from "../types/api.interface";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: object) => instance.post(url, body).then(responseBody)
};

export const ApiRequest = {
  signin: (payload: ISigninPayload): Promise<ISigninResponse> => request.post('/v1/user/login', payload),
  signup: (payload: ISignupPayload): Promise<ISignupResponse> => request.post('/v1/user/register', payload),
}