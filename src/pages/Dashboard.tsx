import { infoCardData } from "@/constants";
import { InfoCard } from "@/components/InfoCard";
import { DashboardTable, Transaction } from "@/data";
import { TransactionDetailsDrawer, BodyDiv } from "@/components";
import { useState } from "react";

const Dashboard = () => {
  const [isTransactionDetailsDrawerOpen, setIsTransactionDetailsDrawerOpen] =
    useState(() => false);
  const [transactionDetails, setTransactionDetails] =
    useState<Transaction | null>(null);

  const onOpenChange = (value: boolean) => {
    if (!value) {
      setTransactionDetails(null);
    }
    setIsTransactionDetailsDrawerOpen(value);
  };

  const viewTransactionDetails = (data: Transaction) => {
    setTransactionDetails(data);
    setIsTransactionDetailsDrawerOpen(true);
  };

  return (
    <div className="h-full w-full">
      <BodyDiv className="flex flex-col relative pl-6 sm:pl-0 pr-6 pt-10 pb-6">
        <div className="w-full flex-1 overflow-auto md:overflow-hidden flex flex-col gap-4 no-scrollbar">
          <div
            className={`grid grid-cols-1 ${
              "custom-grid-md-" + infoCardData.length
            } gap-6 md:gap-5`}
          >
            {infoCardData.map((data) => (
              <InfoCard {...data} />
            ))}
          </div>
          <DashboardTable viewTransactionDetails={viewTransactionDetails} />

          <TransactionDetailsDrawer
            isOpen={isTransactionDetailsDrawerOpen}
            onOpenChange={onOpenChange}
            transactionDetails={transactionDetails!}
          />
        </div>
      </BodyDiv>
    </div>
  );
};

export default Dashboard;
