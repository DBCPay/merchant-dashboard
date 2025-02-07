import { useEffect } from "react";
import Modal from "../Modal";
import { QuestionData } from "../../redux/question/interface";
import Button from "../Button";
import { useRedux } from "../../hooks";
import { showSuccessNotification, showErrorNotification } from "../../helpers";
import {
  deleteQuestion,
  getStaffQuestionsThunk,
  resetDeleteQuestionState,
} from "../../redux";
import { Loader, Spinner } from "../Loader";

interface ConfirmDeleteProps {
  deleteData: QuestionData;
  onClose: () => void;
}

const ConfirmDelete = ({ deleteData, onClose }: ConfirmDeleteProps) => {
  const { dispatch, useStateSelector } = useRedux();
  const {
    isDeletingQuestion,
    isQuestionDeleted,
    deleteQuestionError,
    deleteMessage,
  } = useStateSelector((state) => state.Question);

  const confirmDeletion = () => {
    dispatch(deleteQuestion(deleteData._id));
  };

  // Delete question
  useEffect(() => {
    if (isQuestionDeleted) {
      if (deleteMessage) {
        showSuccessNotification(deleteMessage);
      }
      onClose();
      dispatch(resetDeleteQuestionState());
      dispatch(getStaffQuestionsThunk(null));
    }
  }, [isQuestionDeleted]);

  useEffect(() => {
    if (deleteQuestionError) {
      return showErrorNotification(deleteQuestionError);
    }
  }, [deleteQuestionError]);

  return (
    <Modal
      onClose={onClose}
      modalContentContainerStyle="min-w-[230px] w-11/12 max-w-[350px] h-max"
      shouldModalCloseOnClick={false}
      inlineModalContentStyle={{ maxWidth: "350px" }}
    >
      {isDeletingQuestion && <Loader />}
      <h1 className="text-xl sm:text-2xl mb-6 font-medium text-[var(--base-color)]">
        Delete Question?
      </h1>
      <p>Question: {deleteData?.question}</p>
      <Button
        className={"mt-4 sm:mt-3 mb-3 sm:mb-0"}
        disabled={isDeletingQuestion}
        onClick={confirmDeletion}
      >
        {isDeletingQuestion && <Spinner />}
        {isDeletingQuestion ? "Deleting..." : "Confirm Delete"}
      </Button>
    </Modal>
  );
};

export default ConfirmDelete;
