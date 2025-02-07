import { UserData } from "../../interfaces";
import { ApiResponse } from "../../interfaces";

export interface AccountsApiResponse extends ApiResponse {
  accounts: UserData[];
  nbHits: number;
}
