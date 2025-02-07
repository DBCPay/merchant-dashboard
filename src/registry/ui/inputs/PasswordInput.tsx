import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";
import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Tooltip } from "../tooltip/Tooltip";

const passwordVariants = cva(
  "password-root w-full max-w-96 mb-4 flex px-3 items-center gap-3 border border-[#F3F4F6] bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded-[8px] relative",
  {
    variants: {
      size: {
        md: "h-[52px]",
        lg: "h-[56px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const InputEl = styled.input``;

export type PasswordInputProps = {
  placeholder?: string;
  name?: string;
  onChange: any;
  onBlur?: any;
  onFocus?: any;
  disabled?: boolean;
  defaultValue?: string;
  label?: string;
  error?: string;
  className?: string;
} & VariantProps<typeof passwordVariants>;

const PasswordInputComp = ({
  placeholder,
  name,
  onChange,
  onBlur,
  onFocus,
  label,
  size,
  error,
  disabled = false,
  defaultValue = "",
  className,
}: PasswordInputProps) => {
  const [searchText, setSearchText] = useState(defaultValue);
  const filled = useMemo(() => searchText.length > 0, [searchText]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | undefined>();
  const [hideValue, setHideValue] = useState(true);

  const handleInputFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleInputBlur = () => {
    onBlur?.();
    setIsFocused(false);
  };

  const toggleHideValue = () => {
    setHideValue((prev) => !prev);
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setSearchText(value);
    onChange(e);
  };

  const EyeIcon = useMemo(() => (hideValue ? Eye : EyeOff), [hideValue]);

  const onClickRoot = (e: any) => {
    if (e.target.matches(".password-root")) {
      const valueLength = inputRef?.current?.value.length!;
      inputRef?.current?.focus();
      inputRef?.current?.setSelectionRange(valueLength, valueLength);
    }
  };

  return (
    <div
      className={cn(
        passwordVariants({ size }),
        {
          "border-[#2563EB]": isFocused && !error,
          "bg-[#F9FAFB]": disabled,
          "border-[#F3F4F6]": disabled,
          "border-[#E11D48]": error && !disabled,
          "pointer-events-none": disabled,
        },
        className
      )}
      onClick={onClickRoot}
    >
      {/* Form group */}
      <div className="flex flex-col">
        {/* Label */}
        <label
          className={cn("text-[#6B7280] text-xs label hidden gap-1", {
            block: isFocused || filled,
          })}
        >
          {label || "label"}
        </label>

        {/* Input */}
        <InputEl
          type={hideValue ? "password" : "text"}
          name={name}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          value={searchText}
          disabled={disabled}
          className={classNames(
            "w-full p-0 outline-none outline-[0px] border-none border-[0px] bg-transparent h-auto shadow-none font-normal text-sm text-[#1F2937] placeholder:text-[#6B7280]",
            {
              "text-[#D1D5DB]": disabled,
              "placeholder:text-[#D1D5DB]": disabled,
            }
          )}
          onFocus={() => handleInputFocus()}
          ref={inputRef as any}
        />
      </div>

      {/* Placeholder */}
      <p
        className={cn(
          "absolute text-[#6B7280] placeholder pointer-events-none text-sm hidden",
          { block: !isFocused && !filled }
        )}
      >
        {placeholder || "placeholder"}
      </p>

      {/* Action button */}
      <div
        className={cn("absolute items-center right-0 hidden", { flex: filled })}
      >
        <p className={"text-[#9CA3AF] text-sm outline-none border-none block"}>
          {hideValue ? "Show" : "Hide"}
        </p>

        <button onClick={() => toggleHideValue()} className="h-full p-2 pr-3">
          <EyeIcon
            className={classNames(
              "fi fi-rr-cross-small flex text-[#374151] w-4 h-4 text-lg pointer-events-none",
              { "text-[#D1D5DB]": disabled }
            )}
          />
        </button>
      </div>
    </div>
  );
};

export const PasswordInput = ({ error, ...rest }: PasswordInputProps) => {
  return error ? (
    <Tooltip
      content={error}
      position={"bottom"}
      tooltipContainerClassName="w-full max-w-96"
      arrowPosition="start"
      className="left-0 translate-x-0 max-w-full"
    >
      <PasswordInputComp {...rest} error={error} />
    </Tooltip>
  ) : (
    <PasswordInputComp {...rest} error={error} />
  );
};
