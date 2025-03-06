import { Title, BodyDiv, FormGroup } from "@/components";
import { InvoiceTabsEnum } from "@/enums";
import { useRedux } from "@/hooks";
import { changeInvoiceTab } from "@/redux";
import { WBtn } from "@/registry/ui/buttons/Button";
import { ArrowDownToLine, ArrowLeft, ChevronDown, Printer } from "lucide-react";
import styled from "styled-components";

export const CreateInvoiceHeader = () => {
  const { dispatch } = useRedux();
  const goBack = () => dispatch(changeInvoiceTab(InvoiceTabsEnum.TABLE));

  return (
    <div className="flex justify-between items-center border-b pb-6">
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
        <WBtn variant={"outline"} size={"lg"} className="font-sfpro">
          More actions <ChevronDown />
        </WBtn>
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
          type="text"
          groupLabel="Who are you billing?"
          onChange={onChange}
        />
        <FormGroup
          label={new Date().toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
          type="text"
          groupLabel="Due date"
          onChange={onChange}
        />
        <FormGroup
          label="Item name"
          type="text"
          groupLabel="Who are they paying for?"
          onChange={onChange}
        />
        <FormGroup
          label="Note to your customer"
          type="text"
          groupLabel="Notes \ Terms"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export const InvoicePreview = () => {
  return (
    <div>
      <Title>Preview</Title>
    </div>
  );
};

export const CreateInvoice = () => {
  return (
    <BodyDiv className="flex flex-col relative pl-6 sm:pl-0 pr-6 pt-10 pb-6">
      <div className="w-full flex flex-1 flex-col overflow-auto md:overflow-hidden no-scrollbar bg-white rounded-2xl px-10 pt-6 gap-8">
        <CreateInvoiceHeader />
        <GridLayout>
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
`;
