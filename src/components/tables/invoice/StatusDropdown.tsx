import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { STATUS_OPTIONS } from "@/enums";
import { CustomDropdownMenuCheckboxItem } from "@/registry/ui/drop-down/DropdownMenu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import pinLogo from "@/assets/icons/pin.svg";
import { Column } from "@tanstack/react-table";
import { Invoice } from "@/interfaces";

type StatusDropdownProps = {
  column: Column<Invoice, unknown>;
};

const STATUS_OPTIONS_ARRAY = Object.values(STATUS_OPTIONS);

export const StatusDropDown = ({ column }: StatusDropdownProps) => {
  const [open, setOpen] = useState(false);

  const filterValue = column.getFilterValue() as string[] | undefined;

  // Determine if all statuses are selected
  const isAllSelected =
    filterValue?.length === STATUS_OPTIONS_ARRAY.length || !filterValue;

  // Handle select all toggle
  const handleSelectAll = (checked: boolean) => {
    column.setFilterValue(checked ? STATUS_OPTIONS_ARRAY : []);
  };

  // Handle individual status toggle
  const handleStatusToggle = (status: string) => {
    const currentFilter = filterValue || [];

    if (currentFilter.includes(status)) {
      // Remove status if already selected
      column.setFilterValue(currentFilter.filter((s) => s !== status));
    } else {
      // Add status if not selected
      column.setFilterValue([...currentFilter, status]);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex items-center py-4 px-6 gap-1 w-full h-full border-none outline-none font-semibold text-xs hover:text-[#535862]">
        Status
        {open ? <ChevronUp className="text-blue-600" /> : <ChevronDown />}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white w-[230px] rounded-lg border-none z-20 px-2 py-2.5 shadow-[0px_4px_16px_#0000001F]"
        align="start"
      >
        {/* Header */}
        <DropdownMenuLabel className="p-0 border-b pb-2">
          <p className="px-2 pb-1 text-gray-400 text-xs font-normal font-sfpro mb-1">
            Currently showing
          </p>

          {/* Select all */}
          <CustomDropdownMenuCheckboxItem
            iconType="minus"
            onSelect={(e) => e.preventDefault()}
            className="py-1"
            disabled={isAllSelected}
            checked={isAllSelected}
            onCheckedChange={handleSelectAll}
          >
            <p className="flex justify-between items-center flex-1 text-gray-800 font-normal font-sfpro">
              Select all
            </p>
          </CustomDropdownMenuCheckboxItem>
        </DropdownMenuLabel>

        <DropdownMenuLabel className="px-2 my-2 py-0 font-sfpro text-xs text-gray-400">
          Status
        </DropdownMenuLabel>

        {/* Other options */}
        <div className="flex flex-col gap-1">
          {Object.values(STATUS_OPTIONS).map((status) => (
            <CustomDropdownMenuCheckboxItem
              key={status}
              onSelect={(e) => e.preventDefault()}
              checked={filterValue?.includes(status) || false}
              onCheckedChange={(value) => handleStatusToggle(status)}
              className="capitalize py-1 px-2 cursor-pointer font-sfpro"
            >
              <div className="flex justify-between items-center flex-1 ml-6">
                <p className="text-sm font-sfpro font-normal text-gray-800">
                  {status}
                </p>
                <img src={pinLogo} />
              </div>
            </CustomDropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
