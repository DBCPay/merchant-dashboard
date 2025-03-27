import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Checkbox } from "../checkbox/Checkbox";

interface OtherProps {
  iconType?: "minus" | "check";
}

export const CustomDropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> &
    OtherProps
>(
  (
    { className, children, checked, disabled, iconType = "check", ...props },
    ref
  ) => (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:text-gray-400",
        className
      )}
      checked={checked}
      disabled={disabled}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Checkbox checked={checked} disabled={disabled} iconType={iconType} />
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
);
CustomDropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;
