import { PropsWithChildren } from "react";
import { QuestionData } from "../../redux/question/interface";
import { DivWithoutScrollBar } from "../DivWithoutScrollBar";
import styled from "styled-components";
import QuestionComp from "./QuestionCard";

interface QuestionListProps extends PropsWithChildren {
  list: QuestionData[];
  editQuestion: (data: QuestionData) => void;
  deleteQuestion: (data: QuestionData) => void;
}

const QuestionListComp = ({
  list,
  editQuestion,
  deleteQuestion,
}: QuestionListProps) => {
  return (
    <DivWithoutScrollBar className="h-[90%] my-auto overflow-auto bg-[var(--base-blue)] w-[95%] mx-auto rounded-sm">
      <QuestionList className="grid">
        {list.map((question, i) => (
          <QuestionComp
            question={question}
            index={i}
            editQuestion={editQuestion}
            deleteQuestion={deleteQuestion}
          />
        ))}
      </QuestionList>
    </DivWithoutScrollBar>
  );
};

const QuestionList = styled.ul`
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  overflow-x: hidden;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .grid-auto-max {
    // display: none;
    // grid-template-columns: repeat(auto-fit, minmax(100px, min-content));
    display: flex;
    flex-wrap: wrap;
    gap: 0.1rem 0.4rem;
  }

  .panel {
    transition: max-height 0.2s linear;
  }
`;

export default QuestionListComp;
