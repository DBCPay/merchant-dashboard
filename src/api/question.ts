import { APIClient } from "./apiCore";
import * as url from "./urls";

// instantiate api core
const api = new APIClient();

// Create question
export const postCreateQuestion = (data: any) => {
  return api.create(url.POST_CREATE_QUESTION, data);
};

// Get questions
export const getStaffQuestions = () => {
  return api.get(url.GET_STAFF_QUESTIONS);
};

// Update question
export const postUpdateQuestion = (data: any, questionId: string) => {
  return api.update(`${url.POST_UDPATE_QUESTION}/${questionId}`, data);
};

// Update question
export const postDeleteQuestion = (questionId: string) => {
  return api.delete(`${url.POST_DELETE_QUESTION}/${questionId}`);
};
