import { Tabs } from "@mantine/core";
import { PdfPreview } from "./previews/PdfPreview";

const EmailPreview = () => {
  return <div>Email</div>;
};

const PaymentPagePreview = () => {
  return <div>Payment Page Preview</div>;
};

export const InvoicePreviewTab = () => {
  return (
    <Tabs defaultValue={"PDF"} className="flex flex-col gap-7">
      <Tabs.List className="before:border-b-[1px]">
        <Tabs.Tab
          value="PDF"
          color="#FF5701"
          className="text-gray-600 data-[active]:text-[#FF5701] font-urbanist font-semibold text-sm px-4 py-2.5 data-[active]:border-b-[1px]"
        >
          PDF
        </Tabs.Tab>
        <Tabs.Tab
          value="Email"
          color="#FF5701"
          className="text-gray-600 data-[active]:text-[#FF5701] font-urbanist font-semibold text-sm px-4 py-2.5 data-[active]:border-b-[1px]"
        >
          Email
        </Tabs.Tab>
        <Tabs.Tab
          value="Payment Page"
          color="#FF5701"
          className="text-gray-600 data-[active]:text-[#FF5701] font-urbanist font-semibold text-sm px-4 py-2.5 data-[active]:border-b-[1px]"
        >
          Payment Page
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="PDF">
        <PdfPreview />
      </Tabs.Panel>
      <Tabs.Panel value="Email">
        <EmailPreview />
      </Tabs.Panel>
      <Tabs.Panel value="Payment Page">
        <PaymentPagePreview />
      </Tabs.Panel>
    </Tabs>
  );
};
