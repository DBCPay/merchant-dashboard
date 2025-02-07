import { APIClient } from "./apiCore";
import * as url from "./urls";

// instantiate api core
const api = new APIClient();

// Get accounts
export const getAccounts = () => {
  return api.get(url.GET_ACCOUNTS);
};
