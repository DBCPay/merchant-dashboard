import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

interface TitleProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLHeadingElement> {}

export const Title = ({ children, className, ...props }: TitleProps) => {
  return (
    <h1
      className={cn(
        "font-urbanist font-semibold text-gray-900 text-[22px] leading-[30px]",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export const Titleh4 = ({ children, className, ...props }: TitleProps) => {
  return (
    <h4
      className={cn(
        "text-[#414651] font-urbanist font-semibold text-sm",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
};

export const Titleh6 = ({ children, className, ...props }: TitleProps) => {
  return (
    <h4
      className={cn(
        "text-gray-600 font-urbanist font-semibold text-xs",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
};

interface BodyTextProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLParagraphElement> {}

export const BodySmallText = ({
  children,
  className,
  ...props
}: BodyTextProps) => {
  return (
    <p
      className={cn("text-gray-600 font-normal font-sfpro text-sm", className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const BodySmallMediumText = ({
  children,
  className,
  ...props
}: BodyTextProps) => {
  return (
    <p
      className={cn(
        "text-gray-900 font-medium font-sfpro-medium text-sm",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};
