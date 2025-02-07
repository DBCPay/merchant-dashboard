import { QuestionState, AccountState } from ".";
import { AuthState } from "./auth";
export interface StoreInterface {
  Auth: AuthState;
  Question: QuestionState;
  Account: AccountState;
}

export type RootState = {
  Auth: StoreInterface["Auth"];
  Question: StoreInterface["Question"];
  Account: StoreInterface["Account"];
};
