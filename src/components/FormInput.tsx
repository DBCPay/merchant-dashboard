import { useState } from "react";
import FormFeedback from "./FormFeedback";
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
}

const FormInput = ({
  type,
  label,
  onChange,
  onBlur,
  value,
  placeholder,
  name,
  validation,
  options,
  disabled,
}: FormInputProps) => {
  if (type === "text") {
    return (
      <div className="mb-4 w-full">
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          id={name}
          className="block border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-800 font-medium bg-[var(--input-bg)] cursor-pointer"
        />
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }
  if (type === "textarea") {
    return (
      <div className="mb-4 w-full">
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          id={name}
          className="block border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-800 font-medium bg-[var(--input-bg)] resize-y min-h-32 cursor-pointer"
        />
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="mb-4 w-full">
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
        <div className="relative flex items-center w-full">
          <SelectInput
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            disabled={disabled}
            id={name}
            className="block border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-800 font-medium bg-[var(--input-bg)] cursor-pointer relative"
          >
            <option value={""}>{placeholder}</option>
            {options &&
              options.map((opt) => (
                <option value={opt} className="px-4 py-2">
                  {opt.toUpperCase()}
                </option>
              ))}
          </SelectInput>

          <i className="fi fi-sr-caret-down absolute right-2 top-5 z-100"></i>
        </div>
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  if (type === "password")
    return (
      <PasswordInput
        {...{
          type,
          label,
          onChange,
          onBlur,
          value,
          placeholder,
          name,
          validation,
          disabled,
        }}
      />
    );
  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
        id={name}
        className="block border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer"
      />
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </div>
  );
};

const PasswordInput = ({
  label,
  name,
  onBlur,
  onChange,
  value,
  type,
  placeholder,
  validation,
  disabled,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-4 w-full ">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <div className="relative flex items-center w-full">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          id={name}
          className="block border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          className="absolute right-2 top-5"
        >
          {showPassword ? (
            <i className="fi fi-sr-eye flex"></i>
          ) : (
            <i className="fi fi-sr-eye-crossed flex"></i>
          )}
        </button>
      </div>
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </div>
  );
};

const SelectInput = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export default FormInput;
