import { useState } from "react";
import { TopTab } from "./TopTab";
import { TabsEnum } from "@/enums";
import { CompanyDropDown } from "./CompanyDropdown";
import { WBtn as Button } from "@/registry/ui/buttons/Button";
// @ts-ignore
import BellIcon from "@/assets/images/dashboard/bell.svg?react";
import { ProfileDropDown } from "./ProfileDropdown";

const AdminHeader = () => {
  const [currentTab, setCurrentTab] = useState<TabsEnum>(TabsEnum.TRANSACTIONS);

  const onSelectTab = (tab: TabsEnum) => setCurrentTab(tab);

  return (
    // <div className="p-6 py-2 md:py-3 bg-[var(--white)] flex justify-between items-center border-b-[1px] border-[lightgray]">
    <div className="px-6 bg-gray-100 flex justify-between items-end min-h-[4.5rem]">
      <div>
        <CompanyDropDown />
      </div>

      <TopTab currentTab={currentTab} onSelectTab={onSelectTab} />

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
