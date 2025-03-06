import { Tabs } from "@mantine/core";
import { InvoiceTableTab } from "./invoice/InvoiceTableTab";
import { CreateInvoice } from "./invoice/CreateInvoiceTab";
import { useRedux } from "@/hooks";
import { InvoiceTabsEnum } from "@/enums";

export const InvoiceTab = () => {
  const { useStateSelector } = useRedux();
  const { activeInvoiceTab } = useStateSelector((state) => state.Layout);

  return (
    <Tabs
      className="w-full h-full"
      keepMounted={false}
      value={activeInvoiceTab}
    >
      <Tabs.Panel value={InvoiceTabsEnum.CREATE} className="w-full h-full">
        <CreateInvoice />
      </Tabs.Panel>
      <Tabs.Panel value={InvoiceTabsEnum.TABLE} className="w-full h-full">
        <InvoiceTableTab />
      </Tabs.Panel>
    </Tabs>
  );
};
