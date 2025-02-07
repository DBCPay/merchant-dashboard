import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";
import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { Tooltip } from "../tooltip/Tooltip";

const inputVariants = cva(
  "password-root w-full max-w-96 mb-4 flex px-3 items-center gap-3 border border-[#F3F4F6] bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded-[8px] relative",
  {
    variants: {
      size: {
        sm: "h-10",
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

export type InputProps = {
  placeholder?: string;
  name?: string;
  onChange: any;
  onBlur?: any;
  onFocus?: any;
  disabled?: boolean;
  defaultValue?: string;
  label?: string;
  error?: string;
  hasAction?: boolean;
  Icon?: any;
  onClickAction?(...args: any): any;
  actionText?: string;
} & VariantProps<typeof inputVariants>;

const InputComp = ({
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
  hasAction = false,
  Icon,
  onClickAction,
  actionText,
}: InputProps) => {
  const [searchText, setSearchText] = useState(defaultValue);
  const filled = useMemo(() => searchText.length > 0, [searchText]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | undefined>();

  const handleInputFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleInputBlur = () => {
    onBlur?.();
    setIsFocused(false);
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setSearchText(value);
    onChange(e);
  };

  const onClickRoot = (e: any) => {
    if (e.target.matches(".password-root")) {
      const valueLength = inputRef?.current?.value.length!;
      inputRef?.current?.focus();
      inputRef?.current?.setSelectionRange(valueLength, valueLength);
    }
  };

  return (
    <div
      className={cn(inputVariants({ size }), {
        "border-[#2563EB]": isFocused && !error,
        "bg-[#F9FAFB]": disabled,
        "border-[#F3F4F6]": disabled,
        "border-[#E11D48]": error && !disabled,
        "pointer-events-none": disabled,
      })}
      onClick={onClickRoot}
    >
      <Settings
        className={cn("w-4 h-4 flex", {
          "text-[#9CA3AF]": !filled,
          "text-[#1F2937]": filled || isFocused,
          "text-[#D1D5DB]": disabled,
        })}
      />
      {/* Form group */}
      <div className="flex flex-col">
        {/* Label */}
        <label
          className={cn("text-[#6B7280] text-xs label hidden gap-1", {
            block: (isFocused || filled) && size !== "sm",
          })}
        >
          {label || "label"}
        </label>

        {/* Input */}
        <InputEl
          type={"text"}
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
          "absolute text-[#6B7280] placeholder pointer-events-none text-sm hidden left-9",
          { block: !isFocused && !filled }
        )}
      >
        {placeholder || "placeholder"}
      </p>

      {/* Action button */}
      {hasAction && (
        <div
          className={cn("absolute items-center right-0 hidden", {
            flex: filled,
          })}
        >
          <p
            className={"text-[#9CA3AF] text-sm outline-none border-none block"}
          >
            {actionText}
          </p>

          <button onClick={() => onClickAction?.()} className="h-full p-2 pr-3">
            <Icon
              className={classNames(
                "fi fi-rr-cross-small flex text-[#374151] w-4 h-4 text-lg pointer-events-none",
                { "text-[#D1D5DB]": disabled }
              )}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export const Input = ({ error, ...rest }: InputProps) => {
  return error ? (
    <Tooltip
      content={error}
      position={"bottom"}
      tooltipContainerClassName="w-full max-w-96"
      arrowPosition="start"
      className="left-0 translate-x-0 max-w-full"
    >
      <InputComp {...rest} error={error} />
    </Tooltip>
  ) : (
    <InputComp {...rest} error={error} />
  );
};
