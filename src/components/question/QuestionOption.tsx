import { useRef, useState } from "react";
import FormFeedback from "../FormFeedback";
import styled from "styled-components";

interface FormInputProps {
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  onChange: any;
  onBlur: any;
  value: any;
  validation: any;
  options?: string[];
  disabled?: boolean;
  setFieldValue: any;
  currentAnswer: string;
}

interface CustomCheckboxProps {
  name: string;
  value: any;
  disabled?: boolean;
  setFieldValue: any;
  currentAnswer: string;
}

const QuestionOption = ({
  type,
  label,
  onChange,
  onBlur,
  value,
  placeholder,
  name,
  validation,
  disabled,
  setFieldValue,
  currentAnswer,
}: FormInputProps) => {
  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-2 flex gap-1 h-[42px] items-center">
        <CustomCheckBox
          value={value}
          disabled={disabled}
          currentAnswer={currentAnswer}
          setFieldValue={setFieldValue}
          name={name}
        />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          className="block border-[1px] rounded-md px-4 py-3 text-xs w-full outline-none border-[lightgray] text-gray-800 font-medium bg-[var(--input-bg)] cursor-pointer"
        />
      </div>
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </div>
  );
};

const CustomCheckBox = ({
  value,
  disabled,
  currentAnswer,
  setFieldValue,
  name,
}: CustomCheckboxProps) => {
  const toggleChecked = () => {
    setFieldValue("answer", value);
  };

  const checked = value === currentAnswer && currentAnswer !== "";
  return (
    <CheckboxContainer
      className={`h-full max-h-6 aspect-square border-[1px] rounded-md outline-none border-[var(--primary)] bg-[var(--input-bg)] cursor-pointer flex items-center justify-center ${
        checked && "checked"
      }`}
      onClick={toggleChecked}
      type="button"
      disabled={disabled}
    >
      <Checkbox type="checkbox" className="hidden" checked={checked} />
      <Checkmark className="fi fi-br-check flex text-sm font-extrabold primary"></Checkmark>
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.button`
  &,
  & > * {
    transition: 0.5s ease;
  }

  &.checked {
    background: var(--primary);
    border: none;

    i {
      color: var(--white);
    }
  }
`;

const Checkbox = styled.input``;

const Checkmark = styled.i``;

export default QuestionOption;
