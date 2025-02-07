import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getStaffQuestions,
  postCreateQuestion,
  postDeleteQuestion,
  postUpdateQuestion,
} from "../../api";
import {
  QuestionApiResponse,
  GetStaffQuestionsResponse,
  QuestionData,
  QuestionReqData,
  UpdateQuestionReqData,
} from "./interface";

export interface QuestionState {
  isQuestionsFetched: boolean;
  isFetchingQuestions: boolean;
  questionsFetchError: string;
  fetchMessage: string;
  questions: QuestionData[];
  isCreatingQuestion: boolean;
  isQuestionCreated: boolean;
  createQuestionError: string;
  createMessage: string;
  nbHits: number | null;
  isUpdatingQuestion: boolean;
  isQuestionUpdated: boolean;
  updateQuestionError: string;
  updateMessage: string;
  isDeletingQuestion: boolean;
  isQuestionDeleted: boolean;
  deleteQuestionError: string;
  deleteMessage: string;
}

const INIT_STATE: QuestionState = {
  isQuestionsFetched: false,
  isFetchingQuestions: false,
  questionsFetchError: "",
  fetchMessage: "",
  questions: [],
  isCreatingQuestion: false,
  isQuestionCreated: false,
  createQuestionError: "",
  createMessage: "",
  nbHits: null,
  isUpdatingQuestion: false,
  isQuestionUpdated: false,
  updateQuestionError: "",
  updateMessage: "",
  isDeletingQuestion: false,
  isQuestionDeleted: false,
  deleteQuestionError: "",
  deleteMessage: "",
};

// Create question thunk
export const createQuestion = createAsyncThunk(
  "createQuestion",
  async (data: QuestionReqData, thunkAPI) => {
    try {
      const response = (await postCreateQuestion(
        data
      )) as unknown as QuestionApiResponse;
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create question thunk
export const getStaffQuestionsThunk = createAsyncThunk(
  "getStaffQuestions",
  async (data: any, thunkAPI) => {
    try {
      const response =
        (await getStaffQuestions()) as unknown as GetStaffQuestionsResponse;
      return {
        questions: response.questions,
        message: response.message,
        nbHits: response.nbHits,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update question thunk
export const updateQuestion = createAsyncThunk(
  "updateQuestion",
  async ({ data, questionId }: UpdateQuestionReqData, thunkAPI) => {
    try {
      const response = (await postUpdateQuestion(
        data,
        questionId
      )) as unknown as QuestionApiResponse;
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete question thunk
export const deleteQuestion = createAsyncThunk(
  "deleteQuestion",
  async (questionId: string, thunkAPI) => {
    try {
      const response = (await postDeleteQuestion(
        questionId
      )) as unknown as QuestionApiResponse;
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const questionSlice = createSlice({
  name: "Question",
  initialState: INIT_STATE,
  reducers: {
    resetCreateQuestionState: (state: QuestionState) => {
      state.isCreatingQuestion = false;
      state.isQuestionCreated = false;
      state.createQuestionError = "";
      state.createMessage = "";
    },
    resetFetchQuestionsState: (state: QuestionState) => {
      state.isFetchingQuestions = false;
      state.isQuestionsFetched = false;
      state.questionsFetchError = "";
      state.fetchMessage = "";
      state.questions = [];
    },
    resetUpdateQuestionState: (state: QuestionState) => {
      state.isUpdatingQuestion = false;
      state.isQuestionUpdated = false;
      state.updateQuestionError = "";
      state.updateMessage = "";
    },
    resetDeleteQuestionState: (state: QuestionState) => {
      state.isDeletingQuestion = false;
      state.isQuestionDeleted = false;
      state.deleteQuestionError = "";
      state.deleteMessage = "";
    },
  },
  extraReducers: (builder) => {
    // Create question
    builder.addCase(createQuestion.pending, (state: QuestionState, action) => {
      state.isCreatingQuestion = true;
      state.isQuestionCreated = false;
      state.createQuestionError = "";
      state.createMessage = "";
    });

    builder.addCase(
      createQuestion.fulfilled,
      (state: QuestionState, action) => {
        state.isCreatingQuestion = false;
        state.isQuestionCreated = true;
        state.createMessage = action.payload as string;
        state.createQuestionError = "";
      }
    );

    builder.addCase(createQuestion.rejected, (state: QuestionState, action) => {
      state.isCreatingQuestion = false;
      state.isQuestionCreated = false;
      state.createQuestionError = action.payload as string;
      state.createMessage = "";
    });

    // Get questions
    builder.addCase(
      getStaffQuestionsThunk.pending,
      (state: QuestionState, action) => {
        state.isFetchingQuestions = true;
        state.isQuestionsFetched = false;
        state.questionsFetchError = "";
        state.fetchMessage = "";
        state.questions = [];
      }
    );

    builder.addCase(
      getStaffQuestionsThunk.fulfilled,
      (state: QuestionState, action) => {
        state.isFetchingQuestions = false;
        state.isQuestionsFetched = true;
        state.questions = action.payload.questions;
        state.fetchMessage = action.payload.message;
        state.nbHits = action.payload.nbHits;
      }
    );

    builder.addCase(
      getStaffQuestionsThunk.rejected,
      (state: QuestionState, action) => {
        state.isFetchingQuestions = false;
        state.isQuestionsFetched = false;
        state.questionsFetchError = action.payload as string;
      }
    );

    // Update question
    builder.addCase(updateQuestion.pending, (state: QuestionState, action) => {
      state.isUpdatingQuestion = true;
      state.isQuestionUpdated = false;
      state.updateQuestionError = "";
      state.updateMessage = "";
    });

    builder.addCase(
      updateQuestion.fulfilled,
      (state: QuestionState, action) => {
        state.isUpdatingQuestion = false;
        state.isQuestionUpdated = true;
        state.updateMessage = action.payload as string;
        state.updateQuestionError = "";
      }
    );

    builder.addCase(updateQuestion.rejected, (state: QuestionState, action) => {
      state.isUpdatingQuestion = false;
      state.isQuestionUpdated = false;
      state.updateQuestionError = action.payload as string;
      state.updateMessage = "";
    });

    // Delete question
    builder.addCase(deleteQuestion.pending, (state: QuestionState, action) => {
      state.isDeletingQuestion = true;
      state.isQuestionDeleted = false;
      state.deleteQuestionError = "";
      state.deleteMessage = "";
    });

    builder.addCase(
      deleteQuestion.fulfilled,
      (state: QuestionState, action) => {
        state.isDeletingQuestion = false;
        state.isQuestionDeleted = true;
        state.deleteMessage = action.payload as string;
        state.deleteQuestionError = "";
      }
    );

    builder.addCase(deleteQuestion.rejected, (state: QuestionState, action) => {
      state.isDeletingQuestion = false;
      state.isQuestionDeleted = false;
      state.deleteQuestionError = action.payload as string;
      state.deleteMessage = "";
    });
  },
});

export const {
  resetCreateQuestionState,
  resetFetchQuestionsState,
  resetUpdateQuestionState,
  resetDeleteQuestionState,
} = questionSlice.actions;
export default questionSlice.reducer;
