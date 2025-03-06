import { Avatar } from "@/registry/ui/avatar/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomDropdownItem } from "./CompanyDropdown";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames";

type Props = {};
export const ProfileDropDown = ({}: Props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const logoutHandler = () => {
    navigate("/logout", { replace: true });
  };

  return (
    <div className="">
      <DropdownMenu onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger className="border-none outline-none">
          <Trigger isOpen={isOpen} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="px-2 py-2.5 rounded-lg border-none min-w-[200px] max-w-[400px]"
          align="end"
          style={{ boxShadow: "0px 4px 16px #0000001F" }}
        >
          <CustomDropdownItem placeholder="Settings" />
          <DropdownMenuSeparator className="my-1.5" />
          <CustomDropdownItem
            placeholder="Logout"
            childrenPosition="behind"
            onClick={logoutHandler}
          >
            <LogOut />
          </CustomDropdownItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Trigger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Avatar
      fallbackText="AK"
      size={"md"}
      className={classNames("cursor-pointer", {
        "border-2 border-blue-200": isOpen,
      })}
      fallbackClassName="text-gray-900 font-semibold font-urbanist text-sm bg-blue-100"
    />
  );
};
