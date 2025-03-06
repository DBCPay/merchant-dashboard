import { useProfile } from "@/hooks";
import { Avatar } from "@/registry/ui/avatar/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PropsWithChildren, useState } from "react";
import { ChevronDown, Plus, ChevronUp } from "lucide-react";
import classNames from "classnames";

type Props = {};
export const CompanyDropDown = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className="">
      <DropdownMenu onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger className="border-none outline-none">
          <Trigger isOpen={isOpen} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="px-2 py-2.5 rounded-lg border-none min-w-[200px] max-w-[400px]"
          align="start"
          style={{ boxShadow: "0px 4px 16px #0000001F" }}
        >
          <CustomDropdownItem placeholder="Settings" />
          <DropdownMenuSeparator className="my-1.5" />
          <CustomDropdownItem
            placeholder="Add Company"
            childrenPosition="behind"
          >
            {/* <Plus className="fill-gray-900" /> */}
            <Plus />
          </CustomDropdownItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Trigger = ({ isOpen }: { isOpen: boolean }) => {
  const { userProfile } = useProfile();
  return (
    <div className="bg-gray-100 flex items-center gap-2 rounded-full cursor-pointer pr-1 group">
      <Avatar
        size={"md"}
        altText={userProfile?.firstName || "Company Logo"}
        fallbackText={"CN"}
        className="bg-white"
        fallbackClassName="bg-white"
      />
      <p className="font-sfpro-medium text-sm text-gray-900 group-hover:text-blue-600">
        Company name
      </p>
      {isOpen ? (
        <ChevronUp className="text-gray-900 group-hover:text-blue-600" />
      ) : (
        <ChevronDown className="text-gray-900 group-hover:text-blue-600" />
      )}
    </div>
  );
};

interface ItemProps extends PropsWithChildren {
  placeholder: string;
  onClick?: (...args: any) => any;
  childrenPosition?: "behind" | "after";
  className?: any;
}

export const CustomDropdownItem = ({
  placeholder,
  onClick,
  children,
  childrenPosition,
  className,
}: ItemProps) => {
  return (
    <DropdownMenuItem
      className={classNames(
        "flex items-center cursor-pointer gap-2.5 px-2 py-1 rounded-lg hover:bg-blue-50",
        className
      )}
      onClick={() => onClick?.()}
    >
      {childrenPosition === "behind" && children}
      <p className="text-gray-900 text-sm font-sfpro pointer-events-none leading-[20px]">
        {placeholder}
      </p>
      {childrenPosition === "after" && children}
    </DropdownMenuItem>
  );
};
