import React, { useEffect, useState } from "react";
import { InfoCard } from "../InfoCard";
import { TransactionTable } from "../tables";
import { TransactionDetailsDrawer } from "../drawers";
import { Transaction, TransactionWidgetType } from "@/interfaces";
import transactionWidgetData from "@/data/transaction-widgets.json";
import { BodyDiv, DashboardTableLayoutDiv } from "../reusables";
import { Loader } from "../Loader";

const transactionWidgets = transactionWidgetData as TransactionWidgetType[];

export const TransactionTab = () => {
  const [isTransactionDetailsDrawerOpen, setIsTransactionDetailsDrawerOpen] =
    useState(() => false);
  const [transactionDetails, setTransactionDetails] =
    useState<Transaction | null>(null);
  const [loading, setLoading] = useState(() => true);

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

  useEffect(() => {
    let loadingTmo = setTimeout(() => {
      setLoading(false);
      clearTimeout(loadingTmo);
    }, 150);
  }, []);

  if (loading) return <Loader />;

  return (
    <React.Fragment>
      <BodyDiv className="flex flex-col relative pl-6 sm:pl-0 pr-6 pt-10 pb-6">
        <DashboardTableLayoutDiv className="no-scrollbar">
          <div
            className={`grid grid-cols-1 ${
              "custom-grid-md-" + transactionWidgets.length
            } gap-6 md:gap-5`}
          >
            {transactionWidgets.map((data) => (
              <InfoCard {...data} />
            ))}
          </div>
          <TransactionTable viewTransactionDetails={viewTransactionDetails} />

          <TransactionDetailsDrawer
            isOpen={isTransactionDetailsDrawerOpen}
            onOpenChange={onOpenChange}
            transactionDetails={transactionDetails!}
          />
        </DashboardTableLayoutDiv>
      </BodyDiv>
    </React.Fragment>
  );
};
