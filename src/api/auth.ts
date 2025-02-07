import { APIClient } from "./apiCore";
import * as URL from "./urls";

const api = new APIClient();

export const login = <R>(data: any) => {
  return api.create<R>(URL.LOGIN_AFFILIATE, data);
};

export const register = <R>(data: any) => {
  return api.create<R>(URL.REGISTER_AFFILIATE, data);
};

export const getProfile = () => {
  return api.get(URL.GET_AFFILIATE_PROFILE);
};
