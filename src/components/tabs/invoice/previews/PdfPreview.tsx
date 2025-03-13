import {
  BodySmallMediumText,
  BodySmallText,
  Title,
  Titleh4,
} from "@/components/tokens";
import { Avatar } from "@/registry/ui/avatar/Avatar";
import styled from "styled-components";

const PreviewHeader = () => {
  return (
    <div className="bg-gray-100 px-10 py-5">
      <div className="flex items-center gap-2.5">
        <Avatar
          imageSrc={
            "https://firebasestorage.googleapis.com/v0/b/philipthedeveloper-p.appspot.com/o/phoenix.jpeg?alt=media&token=e9382514-57f2-4d3b-b41a-c1a39479af13"
          }
          fallbackText="CN"
        />
        <Titleh4>Company Name</Titleh4>
      </div>
    </div>
  );
};

const BillFromInfo = () => {
  return (
    <div className="py-6">
      <BodySmallText className="mb-2">Bill from:</BodySmallText>
      <div className="flex flex-col gap-0.5">
        <BodySmallMediumText>Olivia Smite</BodySmallMediumText>
        <BodySmallText>olivia@gmail.com</BodySmallText>
        <BodySmallText>+234 803 123456</BodySmallText>
        <BodySmallText>
          70 Usuma Street, Maitama, Abuja, FCT Abuja, 900271
        </BodySmallText>
      </div>
    </div>
  );
};

const BillToInfo = () => {
  return (
    <div className="py-6 pl-8 border-l border-l-gray-200">
      <BodySmallText className="mb-2">Bill to:</BodySmallText>
      <div className="flex flex-col gap-0.5">
        <BodySmallMediumText>Olivia Smite</BodySmallMediumText>
        <BodySmallText>olivia@gmail.com</BodySmallText>
        <BodySmallText>+234 803 123456</BodySmallText>
        <BodySmallText>
          70 Usuma Street, Maitama, Abuja, FCT Abuja, 900271
        </BodySmallText>
      </div>
    </div>
  );
};

const BillingInfo = () => {
  return (
    <div className="px-10">
      <div className="pt-7 pb-4 flex justify-between items-center border-b border-b-gray-200">
        <Title>INV2398-90-765</Title>
        <div className="flex flex-col items-end">
          <div className="flex items-baseline gap-2">
            <BodySmallText>Issued:</BodySmallText>
            <BodySmallMediumText>18 Feb 2025</BodySmallMediumText>
          </div>
          <div className="flex items-baseline gap-2">
            <BodySmallText>Due:</BodySmallText>
            <BodySmallMediumText>18 Feb 2025</BodySmallMediumText>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 border-b border-b-gray-200">
        <BillFromInfo />
        <BillToInfo />
      </div>
    </div>
  );
};

const InvoiceItemTableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(3, 90px);
`;

const InvoiceItemTableHeaderCell = styled(Titleh4)`
  padding-top: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid #f3f4f6;
`;

const InvoiceItemTableBodyCell = styled(BodySmallText)`
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f4f6;
  color: #111827;
`;

const InvoiceItemTableBodyMediumCell = styled(BodySmallMediumText)`
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f4f6;
  text-align: right;
`;

const InvoiceItemsTable = () => {
  return (
    <div>
      <InvoiceItemTableRow>
        <InvoiceItemTableHeaderCell>Items</InvoiceItemTableHeaderCell>
        <InvoiceItemTableHeaderCell className="text-right">
          Price
        </InvoiceItemTableHeaderCell>
        <InvoiceItemTableHeaderCell className="text-right pr-4">
          Qty
        </InvoiceItemTableHeaderCell>
        <InvoiceItemTableHeaderCell className="text-right">
          Total amount
        </InvoiceItemTableHeaderCell>
      </InvoiceItemTableRow>
      <InvoiceItemTableRow>
        <InvoiceItemTableBodyCell>
          Scented Candle «Cozy Evening»
        </InvoiceItemTableBodyCell>
        <InvoiceItemTableBodyMediumCell>₦80</InvoiceItemTableBodyMediumCell>
        <InvoiceItemTableBodyMediumCell className="pr-4">
          2
        </InvoiceItemTableBodyMediumCell>
        <InvoiceItemTableBodyMediumCell>₦160</InvoiceItemTableBodyMediumCell>
      </InvoiceItemTableRow>
      <InvoiceItemTableRow>
        <InvoiceItemTableBodyCell>
          Exclusive Designer Candle «Eternal Lights»
        </InvoiceItemTableBodyCell>
        <InvoiceItemTableBodyMediumCell>₦470</InvoiceItemTableBodyMediumCell>
        <InvoiceItemTableBodyMediumCell className="pr-4">
          2
        </InvoiceItemTableBodyMediumCell>
        <InvoiceItemTableBodyMediumCell>₦470</InvoiceItemTableBodyMediumCell>
      </InvoiceItemTableRow>
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      <Titleh4 className="text-gray-900">
        Thanks for making business with us
      </Titleh4>
      <BodySmallText className="text-gray-400">
        Let the soft glow and soothing scent of this candle transform your space
        into a sanctuary of warmth and tranquility. A little light, a little
        magic—just for you.
      </BodySmallText>
    </div>
  );
};

const InvoiceBody = () => {
  return (
    <div className="px-10 pt-6 pb-10 flex flex-col gap-6">
      <InvoiceItemsTable />
      <Footer />
    </div>
  );
};

type Props = {};
export const PdfPreview = ({}: Props) => {
  return (
    <PdfPreviewContainer className="bg-white overflow-hidden rounded-2xl">
      <PreviewHeader />
      <BillingInfo />
      <InvoiceBody />
    </PdfPreviewContainer>
  );
};

const PdfPreviewContainer = styled.div`
  box-shadow: 0px 4px 16px 0px #0000001f;
`;
