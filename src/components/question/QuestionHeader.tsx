import { PropsWithChildren } from "react";
import addIcon from "../../assets/icons/24/add.png";
import filterIcon from "../../assets/icons/24/filter.png";
import styled from "styled-components";

interface QuestionHeaderProps extends PropsWithChildren {
  addIconClick: () => void;
  nbHits: number;
}

const QuestionHeader = ({ addIconClick, nbHits }: QuestionHeaderProps) => {
  return (
    <div
      // className="bg-[var(--white)] p-4 flex justify-between items-center rounded-md"
      className="bg-[var(--white)] p-4 flex justify-between items-center border-b-[1px] border-gray-100"
      //   hover:-translate-y-1
      //   style={{ transitionDuration: "300ms" }}
    >
      <p className="font-bold text-sm md:text-base text-gray-500">
        Questions:{" "}
        <span className="info px-2 py-1 ml-1 info-bg rounded-md">{nbHits}</span>
      </p>
      {/* <div className="flex sm:hidden"></div> */}
      <div className="hidden sm:flex">
        <FilterButton className="p-2 flex justify-center items-center secondary-bg px-3 hover:secondary">
          {/* <img src={filterIcon} className="w-5 h-5 aspect-square flex" /> */}
          <i className="fi fi-sr-filters flex secondary"></i>
        </FilterButton>
        <input
          type="text"
          placeholder="Search Question"
          className="min-w-52 md:min-w-80 outline-none bg-[var(--background-white)] self-stretch py-2 px-4 text-sm font-medium"
        />
        <SearchButton className="p-2 flex justify-center items-center primary-bg px-3">
          <i className="fi fi-rr-search flex primary"></i>
        </SearchButton>
      </div>
      <CreateButton
        className="p-2 flex justify-center items-center bg-[var(--primary-bg)] gap-2"
        onClick={addIconClick}
      >
        <p className="text-xs font-semibold primary">Create</p>
        <i className="fi fi-sr-layer-plus flex primary"></i>
        {/* <img src={addIcon} className="w-5 h-5 aspect-square flex" /> */}
      </CreateButton>
    </div>
  );
};

const FilterButton = styled.button`
  &,
  & > * {
    transition: 0.4s ease;
  }

  &:hover {
    background: var(--secondary);

    i {
      color: var(--transparent-white);
    }
  }
`;

const SearchButton = styled.button`
  &,
  & > * {
    transition: 0.4s ease;
  }

  &:hover {
    background: var(--primary);

    i {
      color: var(--transparent-white);
    }
  }
`;

const CreateButton = styled.button`
  &,
  & > * {
    transition: 0.6s ease;
  }

  &:hover {
    background: var(--primary);

    i,
    p {
      color: var(--white);
    }
  }
`;

export default QuestionHeader;
