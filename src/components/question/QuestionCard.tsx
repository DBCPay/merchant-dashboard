import { QuestionData } from "../../redux/question/interface";
import styled from "styled-components";

interface QuestionCompProps {
  question: QuestionData;
  index: number;
  editQuestion: (data: QuestionData) => void;
  deleteQuestion: (data: QuestionData) => void;
}

const optionToAlphabet: [string, string, string, string] = ["A", "B", "C", "D"];

const QuestionComp = ({
  question,
  index,
  editQuestion,
  deleteQuestion,
}: QuestionCompProps) => {
  const togglePanel = (e: any) => {
    const panel = e.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  };

  return (
    <li className="p-4 flex gap-2 md:gap-3 cursor-pointer list-none">
      <div className="">
        <p className="rounded-full w-6 h-6 md:w-8 md:h-8 flex justify-center items-center bg-white text-[var(--base-color)]">
          {index + 1}
        </p>
      </div>
      <div className="flex-1">
        <div className="">
          <p className="text-sm font-bold text-gray-600">
            <span>{question.question}</span>
          </p>
        </div>
        <div className="mt-1">
          <p className="text-[10px] rounded-xl warning bg-[var(--transparent-white)] w-max px-2">
            {question.category}
          </p>
        </div>
        <div className="rounded-lg mt-2 w-full overflow-hidden">
          <button
            className="accordion w-full py-2 px-3 sm:px-4 text-[var(--base-color)] text-left text-xs md:text-sm flex items-center justify-between bg-[var(--transparent-white)]"
            onClick={togglePanel}
          >
            <span className="pointer-events-none">View Options</span>
            <i className="fi fi-sr-caret-down flex pointer-events-none"></i>
          </button>
          <div className="panel max-h-0 overflow-hidden bg-white">
            <div className="grid grid-auto-max py-2 px-3 sm:px-4">
              {question.options.map((option, i) => (
                <p className="text-xs font-medium">
                  <span
                    className={`mr-2 ${
                      option.isCorrectOption && "text-[var(--base-color)]"
                    }`}
                  >
                    {optionToAlphabet[i]}) {option.content}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center text-xl mt-[10px] gap-2">
          <EditButton
            className="text-[var(--warning)] transition-colors rounded-lg w-8 h-8 flex items-center justify-center bg-[var(--warning-bg)]"
            onClick={() => editQuestion(question)}
          >
            <i className="fi fi-sr-file-edit flex text-sm"></i>
          </EditButton>
          <DeleteButton
            className="hover:text-[var(--transparent-white)] text-[var(--danger)] transition-colors rounded-lg w-8 h-8 flex items-center justify-center bg-[var(--danger-bg)]"
            onClick={() => deleteQuestion(question)}
          >
            <i className="fi fi-ss-trash-xmark flex text-sm"></i>
          </DeleteButton>
        </div>
      </div>
    </li>
  );
};

const Button = styled.button`
  &,
  & > * {
    transition: 0.4s ease;
  }
`;

const DeleteButton = styled(Button)`
  &:hover {
    background: var(--danger);

    i {
      color: var(--transparent-white);
    }
  }
`;

const EditButton = styled(Button)`
  &:hover {
    background: var(--warning);

    i {
      color: var(--transparent-white);
    }
  }
`;

export default QuestionComp;
