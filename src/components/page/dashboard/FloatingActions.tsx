import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, X } from "lucide-react";
import { WBtn as Button } from "@/registry/ui/buttons/Button";
import styled from "styled-components";
import { useState } from "react";

type Props = {};
export const FloatingActions = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className="">
      <DropdownMenu onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger className="border-none outline-none floating">
          <Trigger isOpen={isOpen} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="px-0 py-0 rounded-none border-none bg-transparent shadow-none overflow-visible gap-3 flex flex-col"
          align="start"
          side="top"
          sideOffset={12}
        >
          <CustomDropdownItem placeholder="Create invoice" />
          <CustomDropdownItem placeholder="Add goods or services" />
          <CustomDropdownItem placeholder="New client" />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Trigger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Button
      size={"icon"}
      className="bg-[#FF5701] hover:bg-opacity-80 hover:bg-[#ff5701] focus:bg-[#ff5701] border-none rounded-full w-12 h-12 floating"
    >
      {isOpen ? (
        <CustomX className="size-6" />
      ) : (
        <CustomPlus className="size-6" />
      )}
    </Button>
  );
};

const CustomPlus = styled(Plus)`
  &.size-6 {
    width: 1.5rem;
    height: 1.5rem;
  }
  &.size-7 {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

const CustomX = styled(X)`
  &.size-6 {
    width: 1.5rem;
    height: 1.5rem;
  }
  &.size-7 {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

interface ItemProps {
  placeholder: string;
  onClick?: (...args: any) => any;
}

const CustomDropdownItem = ({ placeholder, onClick }: ItemProps) => {
  return (
    <DropdownMenuItem
      className="cursor-pointer bg-white rounded-full py-2.5 px-4 shadow-2xl w-max"
      onClick={() => onClick?.()}
    >
      <p className="text-gray-900 text-sm font-sfpro-medium pointer-events-none">
        {placeholder}
      </p>
    </DropdownMenuItem>
  );
};
