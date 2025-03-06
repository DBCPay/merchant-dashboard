import { InvoiceTabsEnum, TabsEnum } from "@/enums";
import { LayoutState } from "./interface";
import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE: LayoutState = {
  activeTab: TabsEnum.TRANSACTIONS,
  activeInvoiceTab: InvoiceTabsEnum.TABLE,
};

const layoutSlice = createSlice({
  name: "Layout",
  initialState: INIT_STATE,
  reducers: {
    changeTab: (state, action) => {
      state.activeTab = action.payload;
    },
    changeInvoiceTab: (state, action) => {
      state.activeInvoiceTab = action.payload;
    },
  },
});

export const { changeTab, changeInvoiceTab } = layoutSlice.actions;
export default layoutSlice.reducer;
