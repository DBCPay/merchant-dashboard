import { ApiResponse } from "../../interfaces";

interface QuestionAuthor {
  email: string;
  username: string;
}

export interface Option {
  isCorrectOption: boolean;
  content: string;
}

export interface QuestionReqData {
  question: string;
  category: string;
  options: Option[];
}

export interface UpdateQuestionReqData {
  data: QuestionReqData;
  questionId: string;
}

export interface QuestionData extends QuestionReqData {
  author: QuestionAuthor;
  editors: QuestionAuthor[];
  _id: string;
  createdAt: string;
  options: Option[];
}

// export interface CreateQuestionResponse extends ApiResponse {
//   question: QuestionData;
// }

export interface QuestionApiResponse extends ApiResponse {
  question: QuestionData;
}

export interface GetStaffQuestionsResponse extends ApiResponse {
  questions: QuestionData[];
  nbHits: number;
}
