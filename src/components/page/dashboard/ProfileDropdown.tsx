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

type Props = {};
export const ProfileDropDown = ({}: Props) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/logout", { replace: true });
  };

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none outline-none">
          <Trigger />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="px-2 py-2.5 rounded-lg border-none"
          align="end"
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

const Trigger = () => {
  return (
    <Avatar
      fallbackText="AK"
      size={"md"}
      className="cursor-pointer"
      fallbackClassName="text-gray-900 font-semibold font-urbanist text-sm bg-blue-100"
    />
  );
};
