import { QuestionState, AccountState } from ".";
import { AnalyticsState } from "./analytics";
import { AuthState } from "./auth";
export interface StoreInterface {
  Auth: AuthState;
  Question: QuestionState;
  Analytics: AnalyticsState;
  Account: AccountState;
}

export type RootState = {
  Auth: StoreInterface["Auth"];
  Question: StoreInterface["Question"];
  Analytics: StoreInterface["Analytics"];
  Account: StoreInterface["Account"];
};
