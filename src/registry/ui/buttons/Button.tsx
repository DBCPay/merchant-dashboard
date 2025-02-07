import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";

export interface WBtnProps extends ButtonProps {
  customStyle?: string; // You can also add additional custom props
}

export const WBtn: React.FC<WBtnProps> = ({ children, ...buttonProps }) => {
  return <Button {...buttonProps}>{children}</Button>;
};
