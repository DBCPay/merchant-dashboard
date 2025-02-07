import { PropsWithChildren } from "react";
import classNames from "classnames";

const defaultStyles =
  "text-center text-sm py-3 px-4 bg-[#d31010] hover:bg-opacity-75 text-white w-full rounded-md font-medium flex items-center justify-center";

interface ButtonProps extends PropsWithChildren {
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  className?: string; // tailwind/bootstrap classes
  onClick?: () => any;
}

const Button = ({
  type,
  disabled,
  children,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={classNames(defaultStyles, className)}
      type={type || "button"}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
