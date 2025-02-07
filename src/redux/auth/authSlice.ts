import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  login as loginApi,
  register as registerApi,
  getProfile as getProfileApi,
  setAuthorization,
} from "../../api";
import {
  CreateAuthResponse,
  LoginData,
  AuthState,
  RegisterData,
} from "./interface";

const INIT_STATE: AuthState = {
  isLoggedIn: false,
  isLoginReqLoading: false,
  loginError: "",
  message: "",
  registering: false,
  isRegistered: false,
  registerationError: "",
  registerSuccess: "",
};

// Login request thunk
export const login = createAsyncThunk(
  "@@auth/loginUser",
  async (data: LoginData, thunkAPI) => {
    try {
      const response = await loginApi<CreateAuthResponse>(data);
      if (response.success === true) {
        setAuthorization(response.accessToken);
        sessionStorage.setItem("authUser", JSON.stringify(response));
        sessionStorage.setItem("accessToken", response.accessToken);
      }
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  "@@auth/register",
  async (data: RegisterData, thunkAPI) => {
    try {
      const response = await registerApi<CreateAuthResponse>(data);
      setAuthorization(response.accessToken);
      sessionStorage.setItem("authUser", JSON.stringify(response));
      sessionStorage.setItem("accessToken", response.accessToken);
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk("@@auth/logoutUser", async () => {
  sessionStorage.removeItem("authUser");
  sessionStorage.removeItem("accessToken");
  return "done";
});

const loginSlice = createSlice({
  name: "Login",
  initialState: INIT_STATE,
  reducers: {
    resetLoginState: (state: AuthState) => {
      state.isLoginReqLoading = false;
      state.isLoggedIn = false;
      state.loginError = "";
      state.message = "";
    },

    resetRegisterState: (state: AuthState) => {
      state.registering = false;
      state.isRegistered = false;
      state.registerationError = "";
      state.registerSuccess = "";
    },
  },
  extraReducers: (builder) => {
    // REGISTER
    builder.addCase(register.pending, (state: AuthState, action) => {
      state.registering = true;
      state.isRegistered = false;
      state.registerationError = "";
      state.registerSuccess = "";
    });

    builder.addCase(register.fulfilled, (state: AuthState, action) => {
      state.registering = false;
      state.isRegistered = true;
      state.registerSuccess = action.payload as string;
      state.registerationError = "";
    });

    builder.addCase(register.rejected, (state: AuthState, action) => {
      state.registering = false;
      state.isRegistered = false;
      state.registerSuccess = "";
      state.registerationError = action.payload as string;
    });

    // LOGIN
    builder.addCase(login.pending, (state: AuthState, action) => {
      state.isLoginReqLoading = true;
      state.isRegistered = false;
      state.loginError = "";
      state.registerSuccess = "";
    });

    builder.addCase(login.fulfilled, (state: AuthState, action) => {
      state.isLoginReqLoading = false;
      state.isLoggedIn = true;
      state.registerSuccess = action.payload as string;
      state.loginError = "";
    });

    builder.addCase(login.rejected, (state: AuthState, action) => {
      state.isLoginReqLoading = false;
      state.isLoggedIn = false;
      state.message = "";
      state.loginError = action.payload as string;
    });

    builder.addCase(logoutUser.fulfilled, (state: AuthState, action) => {
      state.isLoggedIn = false;
      state.isLoginReqLoading = false;
    });
  },
});

export const { resetLoginState, resetRegisterState } = loginSlice.actions;
export default loginSlice.reducer;
