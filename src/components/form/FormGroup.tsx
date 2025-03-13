import { Input } from "@/registry/ui/inputs/Input";
import React, { PropsWithChildren, useRef } from "react";
import { DateInput } from "./DateInput";
import { MultiSelectInput } from "./MultiSelectInput";
import { ComboboxLikeRenderOptionInput, ComboboxItem } from "@mantine/core";
import { BodySmallMediumText } from "../tokens";
import { Upload } from "lucide-react";

interface FormGroupProps {
  type: "text" | "select" | "radio" | "date" | "multi-select" | "file";
  groupLabel?: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  minDate?: Date;
  multiSelectInputData?: Array<string>;
  renderOptions?: (
    item: ComboboxLikeRenderOptionInput<ComboboxItem>
  ) => React.ReactNode;
}

export const FormGroup = ({
  type,
  groupLabel,
  label,
  placeholder,
  onChange,
  minDate,
  multiSelectInputData,
  renderOptions,
}: FormGroupProps) => {
  switch (type) {
    case "text":
      return (
        <GroupContainer>
          <Label>{groupLabel}</Label>
          <Input
            hasAction={false}
            label={label}
            placeholder={placeholder || label}
            onChange={onChange}
            placeholderClassNames="font-sfpro"
          />
        </GroupContainer>
      );
    case "select":
      return (
        <GroupContainer>
          <Label>{groupLabel}</Label>
          <Input
            hasAction={false}
            label={label}
            placeholder={placeholder || label}
            onChange={onChange}
          />
        </GroupContainer>
      );
    case "date":
      return (
        <GroupContainer>
          <Label>{groupLabel}</Label>
          <DateInput
            placeholder={placeholder || label}
            onChange={onChange}
            minDate={minDate}
          />
        </GroupContainer>
      );
    case "multi-select":
      return (
        <GroupContainer>
          <Label>{groupLabel}</Label>
          <MultiSelectInput
            label={label}
            placeholder={placeholder || label}
            data={multiSelectInputData || []}
            renderOptions={renderOptions}
          />
        </GroupContainer>
      );
    case "file": {
      const fileInputRef = useRef<HTMLInputElement | undefined>(null);
      return (
        <GroupContainer className="items-start">
          <Label>{groupLabel}</Label>
          <button
            className="w-max text-[#FF5701] font-sfpro-medium text-sm flex items-center gap-2"
            onClick={() => fileInputRef?.current?.click()}
          >
            <Upload className="w-4 h-4" />
            Upload files
          </button>
          <input type="file" hidden ref={fileInputRef as any} />
          <BodySmallMediumText className="text-[#414651]">
            JPG GIF PNG PDF | Up to 5 files, 4MB per file
          </BodySmallMediumText>
        </GroupContainer>
      );
    }
    default:
      return (
        <GroupContainer>
          <Label>{groupLabel}</Label>
          <Input
            hasAction={false}
            label={label}
            placeholder={placeholder}
            onChange={onChange}
          />
        </GroupContainer>
      );
      break;
  }
};

const GroupContainer = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  return <div className="flex flex-col gap-3">{props.children}</div>;
};

const Label = (
  props: PropsWithChildren &
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >
) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className="font-urbanist font-semibold text-base text-black"
    >
      {props.children}
    </label>
  );
};
