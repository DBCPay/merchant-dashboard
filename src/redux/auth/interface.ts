import { UserData } from "../../interfaces";
import { ApiResponse } from "../../interfaces";

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateAuthResponse extends ApiResponse {
  user: UserData;
  accessToken: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  isLoginReqLoading: boolean;
  loginError: string;
  message: string;
  registering: boolean;
  isRegistered: boolean;
  registerationError: string;
  registerSuccess: string;
}
