import { APIClient } from "./apiCore";
import * as url from "./urls";

const api = new APIClient();

export const getAnalytics = <R>() => {
  return api.get<R>(url.GET_ANALYTICS);
};
