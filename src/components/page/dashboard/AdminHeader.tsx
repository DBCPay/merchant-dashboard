import { TopTab } from "./TopTab";
import { CompanyDropDown } from "./CompanyDropdown";
import { WBtn as Button } from "@/registry/ui/buttons/Button";
// @ts-ignore
import BellIcon from "@/assets/images/dashboard/bell.svg?react";
import { ProfileDropDown } from "./ProfileDropdown";

const AdminHeader = () => {
  return (
    // <div className="p-6 py-2 md:py-3 bg-[var(--white)] flex justify-between items-center border-b-[1px] border-[lightgray]">
    <div className="px-6 bg-gray-100 flex justify-between items-center pt-5 h-[4.5rem]">
      <div>
        <CompanyDropDown />
      </div>

      <TopTab />

      <div className="flex gap-4 flex-end">
        <Button
          variant={"secondary_gray"}
          size={"icon"}
          className="border-none rounded-full"
        >
          <BellIcon />
        </Button>
        <ProfileDropDown />
      </div>
    </div>
  );
};

export default AdminHeader;
