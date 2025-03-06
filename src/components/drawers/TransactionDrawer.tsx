import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import { Transaction } from "@/interfaces";
import { Badge } from "@/registry/ui/badge/Badge";
import { WBtn } from "@/registry/ui/buttons/Button";
import { Download, X } from "lucide-react";
import styled from "styled-components";
import { ClientCard, InvoiceCard } from "../cards";

interface SheetHeaderCompProps {
  transactionDetails: Transaction;
  onOpenChange: (value: boolean) => void;
}

const SheetHeaderComp = ({
  transactionDetails,
  onOpenChange,
}: SheetHeaderCompProps) => {
  return (
    <CustomSheetHeader className="flex p-8 justify-between items-center flex-row border-b border-b-gray-100">
      <div>
        <p className="font-urbanist font-semibold text-gray-900 text-2xl">
          {transactionDetails?.transactionId}
        </p>
        <p className="font-sfpro text-sm text-gray-400">Transaction ID</p>
      </div>
      <div className="custom">
        <p className="font-urbanist font-semibold text-gray-900 text-2xl">
          ₦
          {transactionDetails?.amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </p>
        <p className="font-sfpro text-sm text-gray-400">Amount</p>
      </div>
      <div className="custom">
        <WBtn
          variant={"secondary_gray"}
          size={"icon"}
          className="border-none rounded-full bg-gray-100"
          onClick={() => onOpenChange(false)}
        >
          <X />
        </WBtn>
      </div>
    </CustomSheetHeader>
  );
};

const badgeVariantMap: Record<string, any> = {
  Paid: "success",
  "In progress": "gray",
  Refunds: "warning",
  Failed: "error",
};

interface TransactionDetailsDrawerProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  transactionDetails: Transaction;
}

export function TransactionDetailsDrawer({
  isOpen,
  onOpenChange,
  transactionDetails,
}: TransactionDetailsDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal={false}>
      <CustomSheetContent className="rounded-2xl p-0">
        <SheetHeaderComp
          transactionDetails={transactionDetails}
          onOpenChange={onOpenChange}
        />
        <div>
          <div className="px-8 pb-4 mt-10 flex justify-between items-end">
            <p className="font-urbanist font-semibold text-lg text-gray-900">
              Payment details
            </p>
            <Button variant={"outline"}>
              <Download className="text-gray-800 outine-gray-800" />
              <p className="font-sfpro-medium text-sm text-gray-800">Refund</p>
            </Button>
          </div>

          {/* Payment Details */}
          <div className="px-8">
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">
                Transaction type
              </p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {transactionDetails?.transactionType}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Status</p>
              <Badge
                variant={
                  badgeVariantMap[
                    transactionDetails?.status as keyof typeof badgeVariantMap
                  ]
                }
                className="font-sfpro-medium"
                size={"sm"}
              >
                {transactionDetails?.status}
              </Badge>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Payment Method</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {transactionDetails?.paymentMethod}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Client ID</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {transactionDetails?.clientId}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">
                Client IP address
              </p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {transactionDetails?.clientIpAddress}
              </p>
            </CustomRow>
            <CustomRow>
              <p className="font-sfpro text-sm text-gray-900">Invoice ID</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {transactionDetails?.invoiceId}
              </p>
            </CustomRow>
            <CustomRow className="no-border border-none">
              <p className="font-sfpro text-sm text-gray-900">Description</p>
              <p className="font-sfpro-medium text-sm text-gray-900">
                {transactionDetails?.description}
              </p>
            </CustomRow>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <InvoiceCard
                header="Invoice ID"
                content={transactionDetails?.invoiceId}
              />
              <ClientCard
                header={transactionDetails?.clientName}
                content={transactionDetails?.clientEmail}
              />
            </div>
          </div>
        </div>
      </CustomSheetContent>
    </Sheet>
  );
}

const CustomSheetContent = styled(SheetContent)`
  height: 95%;
  align-self: center;
  margin-right: 1.5rem;
  min-width: 660px;
  box-shadow: 0px 4px 16px #0000001f;

  & > button:not(.custom) {
    display: none;
  }
`;

const CustomSheetHeader = styled(SheetHeader)`
  & > div {
    margin: 0px !important;
  }
`;

const CustomRow = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;
