import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccounts } from "../../api";
import { AccountsApiResponse } from "./interface";
import { UserData } from "../../interfaces";

export interface AccountState {
  isAccountsFetched: boolean;
  isFetchingAccounts: boolean;
  accountsFetchError: string;
  fetchMessage: string;
  accounts: UserData[];
  nbHits: number | null;
}

const INIT_STATE: AccountState = {
  isAccountsFetched: false,
  isFetchingAccounts: false,
  accountsFetchError: "",
  fetchMessage: "",
  accounts: [],
  nbHits: null,
};

// Create question thunk
export const getAccountsThunk = createAsyncThunk(
  "getAcccounts",
  async (data: any, thunkAPI) => {
    try {
      const response = (await getAccounts()) as unknown as AccountsApiResponse;
      return {
        accounts: response.accounts,
        message: response.message,
        nbHits: response.nbHits,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const accountsSlice = createSlice({
  name: "Question",
  initialState: INIT_STATE,
  reducers: {
    resetFetchAccountsState: (state: AccountState) => {
      state.isFetchingAccounts = false;
      state.isAccountsFetched = false;
      state.accountsFetchError = "";
      state.fetchMessage = "";
      state.accounts = [];
    },
  },
  extraReducers: (builder) => {
    // Get accounts
    builder.addCase(getAccountsThunk.pending, (state: AccountState, action) => {
      state.isFetchingAccounts = true;
      state.isAccountsFetched = false;
      state.accountsFetchError = "";
      state.fetchMessage = "";
      state.accounts = [];
    });

    builder.addCase(
      getAccountsThunk.fulfilled,
      (state: AccountState, action) => {
        state.isFetchingAccounts = false;
        state.isAccountsFetched = true;
        state.accounts = action.payload.accounts;
        state.fetchMessage = action.payload.message;
        state.nbHits = action.payload.nbHits;
      }
    );

    builder.addCase(
      getAccountsThunk.rejected,
      (state: AccountState, action) => {
        state.isFetchingAccounts = false;
        state.isAccountsFetched = false;
        state.accountsFetchError = action.payload as string;
      }
    );
  },
});

export const { resetFetchAccountsState } = accountsSlice.actions;
export default accountsSlice.reducer;
