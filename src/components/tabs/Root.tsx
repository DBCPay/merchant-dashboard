import { TabsEnum } from "@/enums";
import { useRedux } from "@/hooks";
import { Tabs } from "@mantine/core";
import { MainTab } from "./MainTab";
import { InvoiceTab } from "./InvoiceTab";
import { TransactionTab } from "./TransactionTab";
import { CatalogTab } from "./CatalogTab";
import { ClientTab } from "./ClientTab";
import styled from "styled-components";

export const DashboardTabs = () => {
  const { useStateSelector } = useRedux();
  const { activeTab } = useStateSelector((state) => state.Layout);

  return (
    <Tabs value={activeTab} className="w-full h-full" keepMounted={false}>
      <Tabs.Panel value={TabsEnum.MAIN}>
        <MainTab />
      </Tabs.Panel>
      <Tabs.Panel value={TabsEnum.INVOICES} className="w-full h-full">
        <InvoiceTab />
      </Tabs.Panel>
      <Tabs.Panel value={TabsEnum.TRANSACTIONS} className="w-full h-full">
        <TransactionTab />
      </Tabs.Panel>
      <Tabs.Panel value={TabsEnum.CATALOG}>
        <CatalogTab />
      </Tabs.Panel>
      <Tabs.Panel value={TabsEnum.CLIENTS}>
        <ClientTab />
      </Tabs.Panel>
    </Tabs>
  );
};
