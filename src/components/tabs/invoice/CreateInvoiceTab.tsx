import {
  Title,
  BodyDiv,
  FormGroup,
  CustomDateInput,
  CustomDropdownItem,
} from "@/components";
import { InvoiceTabsEnum } from "@/enums";
import { useRedux } from "@/hooks";
import { changeInvoiceTab } from "@/redux";
import { WBtn } from "@/registry/ui/buttons/Button";
import { ArrowDownToLine, ArrowLeft, ChevronDown, Printer } from "lucide-react";
import styled from "styled-components";
import { InvoicePreviewTab } from "./InvoicePreviewTab";

import { Avatar } from "@/registry/ui/avatar/Avatar";
import { Group, MultiSelectProps, Text } from "@mantine/core";
import { Checkbox } from "@/registry/ui/checkbox/Checkbox";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const usersData: Record<
  string,
  { image: string; email: string; fallbackText: string; name: string }
> = {
  "Olivia Smite": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
    fallbackText: "OS",
    name: "Olivia Smite",
    email: "olivia@gmail.com",
  },
  "James Carter": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
    name: "James Carter",
    fallbackText: "JC",
    email: "carterj@gmail.com",
  },
  "Emily Watson": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
    name: "Emily Watson",
    fallbackText: "EW",
    email: "emilyw@gmail.com",
  },
  "Ethan Barnes": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
    name: "Ethan Barnes",
    fallbackText: "EB",
    email: "ethan_explorer@gmail.com",
  },
  "Mason Taylor": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    name: "Mason Taylor",
    fallbackText: "MT",
    email: "mason_musician@gmail.com",
  },
};

const renderMultiSelectOption: MultiSelectProps["renderOption"] = ({
  option,
}) => (
  <Group gap="sm" className="flex-1">
    <Avatar
      imageSrc={usersData[option.value].image}
      size={"sm"}
      fallbackText={usersData[option.value].fallbackText}
      altText={usersData[option.value].fallbackText}
    />
    <div className="flex justify-between flex-1">
      <Text size="sm" className="font-sfpro text-gray-800 text-sm">
        {usersData[option.value].name}
      </Text>
      <Text className="text-[#9CA3AF] font-sfpro text-sm">
        {usersData[option.value].email}
      </Text>
    </div>
  </Group>
);

export const MoreActionsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none outline-none">
        <WBtn variant={"outline"} size={"lg"} className="font-sfpro">
          More actions <ChevronDown />
        </WBtn>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="px-2 py-2.5 rounded-lg border-none w-52 bg-white z-40 mt-1"
        align="end"
        style={{
          boxShadow: "0px 4px 16px 0px #0000001F",
        }}
      >
        <CustomDropdownItem placeholder="Safe draft" />
        <CustomDropdownItem placeholder="Edit business info" />
        <CustomDropdownItem placeholder="Edit or add logo" />
        <CustomDropdownItem placeholder="Apply template" />
        <CustomDropdownItem placeholder="Save template" />
        <CustomDropdownItem placeholder="Share link to invoice" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const CreateInvoiceHeader = () => {
  const { dispatch } = useRedux();
  const goBack = () => dispatch(changeInvoiceTab(InvoiceTabsEnum.TABLE));

  return (
    <div className="flex justify-between items-center border-b pb-6 px-10">
      <div className="flex items-center gap-2">
        <WBtn
          variant="outline"
          size={"icon"}
          className="rounded-full"
          onClick={goBack}
        >
          <ArrowLeft />
        </WBtn>
        <p className="font-spfro-medium text-black text-sm">Back</p>
      </div>
      <div className="flex items-center gap-4">
        <WBtn variant={"outline"} size={"lg"} className="w-12 rounded-full">
          <ArrowDownToLine />
        </WBtn>
        <WBtn variant={"outline"} size={"lg"} className="w-12 rounded-full">
          <Printer />
        </WBtn>
        <MoreActionsDropdown />
        <WBtn
          size={"lg"}
          className="font-sfpro bg-[#FF5701] hover:bg-opacity-80 hover:bg-[#ff5701] focus:bg-[#ff5701]"
        >
          Send PDF
        </WBtn>
      </div>
    </div>
  );
};

export const CreateInvoiceForm = () => {
  const onChange = (e: any) => console.log(e);

  return (
    <div>
      <Title>Invoice details</Title>
      <div className="mt-8 gap-8 flex flex-col">
        <FormGroup
          label="Client name or email"
          type="multi-select"
          groupLabel="Client name or email"
          onChange={onChange}
          multiSelectInputData={[
            "Olivia Smite",
            "James Carter",
            "Emily Watson",
            "Ethan Barnes",
            "Mason Taylor",
          ]}
          renderOptions={renderMultiSelectOption}
        />
        <FormGroup
          label="Due date"
          type="date"
          groupLabel="Due date"
          onChange={onChange}
          minDate={new Date()}
        />
        <FormGroup
          label="Item name"
          type="multi-select"
          groupLabel="Products sold"
          onChange={onChange}
          multiSelectInputData={[
            "Mens Wear",
            "Cargo Pants",
            "Sweat Shirt",
            "Joggers",
            "Shorts",
          ]}
        />
        <div className="w-full border-b border-b-gray-200 pb-10">
          <FormGroup
            label="Note to your customer"
            type="text"
            groupLabel="Notes \ Terms"
            onChange={onChange}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Checkbox name="coupon" id="coupon" />
            <label
              htmlFor="coupon"
              className="cursor-pointer font-sfpro-medium text-[#414651] text-sm"
            >
              Add coupon
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox name="discount" id="discount" size={"sm"} />
            <label
              htmlFor="discount"
              className="cursor-pointer font-sfpro-medium text-[#414651] text-sm"
            >
              Add discount
            </label>
          </div>
        </div>

        <div className="w-full border-t border-t-gray-200 pt-10">
          <FormGroup type="file" groupLabel="Attachments" />
        </div>
      </div>
    </div>
  );
};

export const InvoicePreview = () => {
  return (
    <div className="flex flex-col gap-7">
      <Title>Preview</Title>
      <InvoicePreviewTab />
    </div>
  );
};

export const CreateInvoice = () => {
  return (
    <BodyDiv className="flex flex-col relative pl-6 sm:pl-0 pr-6 pt-10 pb-6">
      <div className="w-full flex flex-1 flex-col overflow-auto md:overflow-hidden no-scrollbar bg-white rounded-2xl pt-6 gap-8">
        <CreateInvoiceHeader />
        <GridLayout className="overflow-auto no-scrollbar pb-20 px-10">
          <CreateInvoiceForm />
          <InvoicePreview />
        </GridLayout>
      </div>
    </BodyDiv>
  );
};

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 590px;
  gap: 5rem;

  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;
