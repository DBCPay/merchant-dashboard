import { Input } from "@/registry/ui/inputs/Input";
import React, { PropsWithChildren } from "react";

interface FormGroupProps {
  type: "text" | "select" | "radio";
  groupLabel?: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
}

export const FormGroup = ({
  type,
  groupLabel,
  label,
  placeholder,
  onChange,
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

const GroupContainer = (props: PropsWithChildren) => {
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
