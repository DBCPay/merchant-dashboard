import clsx from "clsx";
import React, { PropsWithChildren } from "react";

interface TitleProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLHeadingElement> {}

export const Title = ({ children, className, ...props }: TitleProps) => {
  return (
    <h1
      className={clsx(
        "font-urbanist font-semibold text-gray-900 text-[22px] leading-[30px]",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};
