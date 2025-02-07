import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAnalytics as getAnalyticsApi } from "../../api";
import { GetAnalyticsResponse } from "./interface";
import { StatWidgetInterface } from "../../data/statWidget";

export interface AnalyticsState {
  isAnalyticsFetched: boolean;
  isFetchingAnalytics: boolean;
  analyticsFetchError: string;
  fetchMessage: string;
  analytics: StatWidgetInterface[];
}

const INIT_STATE: AnalyticsState = {
  isAnalyticsFetched: false,
  isFetchingAnalytics: false,
  analyticsFetchError: "",
  fetchMessage: "",
  analytics: [],
};

// Get staff analytics thunk
export const getStaffAnalyticsThunk = createAsyncThunk(
  "getStaffAnalytics",
  async (data: any, thunkAPI) => {
    try {
      const response = await getAnalyticsApi<GetAnalyticsResponse>();
      return {
        analytics: response.analytics,
        message: response.message,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const analyticsSlice = createSlice({
  name: "Analytics",
  initialState: INIT_STATE,
  reducers: {
    resetFetchAnalyticsState: (state: AnalyticsState) => {
      state.isFetchingAnalytics = false;
      state.isAnalyticsFetched = false;
      state.analyticsFetchError = "";
      state.fetchMessage = "";
      state.analytics = [];
    },
  },
  extraReducers: (builder) => {
    // Get analytics
    builder.addCase(
      getStaffAnalyticsThunk.pending,
      (state: AnalyticsState, action) => {
        state.isFetchingAnalytics = true;
        state.isAnalyticsFetched = false;
        state.analyticsFetchError = "";
        state.fetchMessage = "";
        state.analytics = [];
      }
    );

    builder.addCase(
      getStaffAnalyticsThunk.fulfilled,
      (state: AnalyticsState, action) => {
        state.isFetchingAnalytics = false;
        state.isAnalyticsFetched = true;
        state.analytics = action.payload.analytics;
        state.fetchMessage = action.payload.message;
      }
    );

    builder.addCase(
      getStaffAnalyticsThunk.rejected,
      (state: AnalyticsState, action) => {
        state.isFetchingAnalytics = false;
        state.isAnalyticsFetched = false;
        state.analyticsFetchError = action.payload as string;
      }
    );
  },
});

export const { resetFetchAnalyticsState } = analyticsSlice.actions;
export default analyticsSlice.reducer;
