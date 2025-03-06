import { QuestionState, AccountState, LayoutState } from ".";
import { AuthState } from "./auth";
export interface StoreInterface {
  Auth: AuthState;
  Question: QuestionState;
  Account: AccountState;
  Layout: LayoutState;
}

export type RootState = {
  Auth: StoreInterface["Auth"];
  Question: StoreInterface["Question"];
  Account: StoreInterface["Account"];
  Layout: StoreInterface["Layout"];
};
