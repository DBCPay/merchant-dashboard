import { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import FormInput from "../FormInput";
import { Spinner, Loader } from "../Loader";
import { DivWithoutScrollBar } from "../DivWithoutScrollBar";
import { useRedux } from "../../hooks";
import {
  createQuestion,
  getStaffQuestionsThunk,
  resetCreateQuestionState,
  resetUpdateQuestionState,
  updateQuestion,
} from "../../redux";
import { showSuccessNotification, showErrorNotification } from "../../helpers";
import { questionCategories } from "../../data";
import Alert from "../Alert";
import Modal from "../Modal";
import { QuestionData } from "../../redux/question/interface";
import Button from "../Button";
import QuestionOption from "./QuestionOption";
import { clone, omit } from "lodash-es";

interface CreateQuestionProps {
  onClose: () => void;
  shouldEdit: boolean;
  editData: QuestionData | null;
  cancelEdit: () => void;
}

const CreateQuestion = ({
  onClose,
  shouldEdit,
  editData,
  cancelEdit,
}: CreateQuestionProps) => {
  const { dispatch, useStateSelector } = useRedux();
  const {
    isCreatingQuestion,
    isQuestionCreated,
    createMessage,
    createQuestionError,
    isUpdatingQuestion,
    isQuestionUpdated,
    updateMessage,
    updateQuestionError,
  } = useStateSelector((state) => state.Question);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      question: editData?.question || "",
      answer:
        editData?.options.find((opt) => opt.isCorrectOption)?.content || "",
      optionA: editData?.options ? editData.options[0].content : "",
      optionB: editData?.options ? editData.options[1].content : "",
      optionC: editData?.options ? editData.options[2].content : "",
      optionD: editData?.options ? editData.options[3].content : "",
      category: editData?.category || "",
    },
    validationSchema: yup.object({
      category: yup.string().required("Please select category"),
      question: yup.string().required("Please enter question"),
      answer: yup
        .string()
        .required("Please select answer")
        .oneOf(
          [
            yup.ref("optionA"),
            yup.ref("optionB"),
            yup.ref("optionC"),
            yup.ref("optionD"),
          ],
          "Answer must match one of the options"
        ),
      // answer: yup.string().required("Please select answer"),
      optionA: yup.string().required("Please provide option"),
      optionB: yup
        .string()
        .required("Please provide option")
        .notOneOf(
          [yup.ref("optionA")],
          //   "Option B must be different from Option A"
          "Duplicated option detected"
        ),
      optionC: yup
        .string()
        .required("Please provide option")
        .notOneOf(
          [yup.ref("optionA"), yup.ref("optionB")],
          //   "Option C must be different from Option A and Option B"
          "Duplicated option detected"
        ),
      optionD: yup
        .string()
        .required("Please provide option")
        .notOneOf(
          [yup.ref("optionA"), yup.ref("optionB"), yup.ref("optionC")],
          //   "Option D must be different from Option A, Option B and Option C"
          "Duplicated option detected"
        ),
    }),
    onSubmit: (values) => {
      const options: [string, string, string, string] = [
        values.optionA,
        values.optionB,
        values.optionC,
        values.optionD,
      ];
      const optionsData = options.map((option) => ({
        isCorrectOption: option === values.answer,
        content: option,
      }));
      const questionData = {
        category: values.category,
        question: values.question,
        options: optionsData,
      };
      if (shouldEdit && editData !== null) {
        dispatch(
          updateQuestion({ questionId: editData._id, data: questionData })
        );
      } else {
        dispatch(createQuestion(questionData));
      }
    },
  });

  // Create question
  useEffect(() => {
    if (isQuestionCreated) {
      if (createMessage) {
        showSuccessNotification(createMessage);
      }
      validation.resetForm();
      // onClose();
      dispatch(resetCreateQuestionState());
      dispatch(getStaffQuestionsThunk(null));
    }
  }, [isQuestionCreated]);

  useEffect(() => {
    if (createQuestionError) {
      dispatch(resetCreateQuestionState());
      return showErrorNotification(createQuestionError);
    }
  }, [createQuestionError]);

  // Update question
  useEffect(() => {
    if (isQuestionUpdated) {
      if (updateMessage) {
        showSuccessNotification(updateMessage);
      }
      // onClose();
      cancelEdit();
      dispatch(resetUpdateQuestionState());
      dispatch(getStaffQuestionsThunk(null));
    }
  }, [isQuestionUpdated]);

  useEffect(() => {
    if (updateQuestionError) {
      return showErrorNotification(updateQuestionError);
    }
  }, [updateQuestionError]);
  return (
    <Modal
      onClose={() => (shouldEdit ? cancelEdit() : onClose())}
      shouldModalCloseOnClick={!isCreatingQuestion && !isUpdatingQuestion}
      modalContentContainerStyle="rounded-md"
    >
      {(isCreatingQuestion || isUpdatingQuestion) && (
        <Loader type={"primary"} />
      )}
      <h1 className="text-xl sm:text-2xl mb-6 font-medium text-[var(--primary)]">
        {shouldEdit ? "Edit Question" : "Create Queston"}
      </h1>
      {/* <Alert type="info" className="mb-4">
          You must select question category before you can fill in other fields
        </Alert> */}
      <DivWithoutScrollBar className="pb-60 sm:pb-32 h-5/6 overflow-auto relative">
        <form
          className="relative w-full sm:grid sm:grid-cols-2 sm:gap-x-4 md:gap-x-10 lg:gap-x-16"
          onSubmit={(e) => {
            e.preventDefault();
            // Omit the 'address' property from the cloned object
            const clonedObject = omit(clone(validation.values), "answer");

            // Get the values of the resulting object
            const valuesArray = Object.values(clonedObject);

            if (
              validation.values.answer === "" ||
              !valuesArray.includes(validation.values.answer)
            )
              return showErrorNotification("Please select correct answer");

            validation.handleSubmit();
            return false;
          }}
        >
          <div>
            <FormInput
              type="select"
              name="category"
              label="Category"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder="Select category"
              value={validation.values.category || ""}
              validation={validation}
              options={questionCategories}
            />
            <FormInput
              type="textarea"
              name="question"
              label="Question"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder="Enter your question...???"
              value={validation.values.question || ""}
              validation={validation}
              disabled={!validation.values.category}
            />

            {/* <FormInput
              type="select"
              name="answer"
              label="Answer"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder="Select name"
              value={validation.values.answer || ""}
              validation={validation}
              options={["A", "B", "C", "D"]}
              disabled={!validation.values.category}
            /> */}
          </div>

          <div>
            {/* <FormInput
              type="text"
              name="optionA"
              label="Option A"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder="Enter option A"
              value={validation.values.optionA || ""}
              validation={validation}
              disabled={!validation.values.category}
            /> */}
            <QuestionOption
              type="text"
              name="optionA"
              label="Option A"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder="Enter option A"
              value={validation.values.optionA || ""}
              validation={validation}
              disabled={!validation.values.category}
              setFieldValue={validation.setFieldValue}
              currentAnswer={validation.values.answer}
            />
            {/* <FormInput
              type="text"
              name="optionB"
              label="Option B"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder="Enter option B"
              value={validation.values.optionB || ""}
              validation={validation}
              disabled={!validation.values.category}
            /> */}
            <QuestionOption
              type="text"
              name="optionB"
              label="Option B"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder="Enter option B"
              value={validation.values.optionB || ""}
              validation={validation}
              disabled={!validation.values.category}
              setFieldValue={validation.setFieldValue}
              currentAnswer={validation.values.answer}
            />
            {/* <FormInput
              type="text"
              name="optionC"
              label="Option C"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder="Enter option C"
              value={validation.values.optionC || ""}
              validation={validation}
              disabled={!validation.values.category}
            /> */}
            <QuestionOption
              type="text"
              name="optionC"
              label="Option C"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder="Enter option C"
              value={validation.values.optionC || ""}
              validation={validation}
              disabled={!validation.values.category}
              setFieldValue={validation.setFieldValue}
              currentAnswer={validation.values.answer}
            />
            {/* <FormInput
              type="text"
              name="optionD"
              label="Option D"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder="Enter option D"
              value={validation.values.optionD || ""}
              validation={validation}
              disabled={!validation.values.category}
            /> */}
            <QuestionOption
              type="text"
              name="optionD"
              label="Option D"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder="Enter option D"
              value={validation.values.optionD || ""}
              validation={validation}
              disabled={!validation.values.category}
              setFieldValue={validation.setFieldValue}
              currentAnswer={validation.values.answer}
            />
          </div>

          <div className="mt-8 col-span-full">
            <Button
              type="submit"
              disabled={isCreatingQuestion || isUpdatingQuestion}
              className="bg-[var(--primary)]"
            >
              {(isCreatingQuestion || isUpdatingQuestion) && (
                <Spinner type={"primary"} />
              )}
              {isCreatingQuestion && "Creating..."}
              {isUpdatingQuestion && "Editing..."}
              {!isCreatingQuestion &&
                !isUpdatingQuestion &&
                (shouldEdit ? "Edit Question" : "Create question")}
            </Button>
          </div>
        </form>
      </DivWithoutScrollBar>
    </Modal>
  );
};

export default CreateQuestion;
