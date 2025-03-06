import { Fragment, useEffect, useState } from "react";
import { InfoCard } from "@/components/InfoCard";
import invoiceWidgetData from "@/data/invoice-widget.json";
import { InvoiceWidgetType } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { InvoiceTable } from "@/components/tables";
import { BodyDiv, DashboardTableLayoutDiv } from "@/components/reusables";
import { useRedux } from "@/hooks";
import { changeInvoiceTab } from "@/redux";
import { InvoiceTabsEnum } from "@/enums";
import { Loader } from "@/components/Loader";

const invoiceWidgets = invoiceWidgetData as InvoiceWidgetType[];

type Props = {};
export const InvoiceTableTab = ({}: Props) => {
  const { dispatch } = useRedux();

  const [loading, setLoading] = useState(() => true);

  const createInvoice = () =>
    dispatch(changeInvoiceTab(InvoiceTabsEnum.CREATE));

  useEffect(() => {
    let loadingTmo = setTimeout(() => {
      setLoading(false);
      clearTimeout(loadingTmo);
    }, 150);
  }, []);

  if (loading) return <Loader />;

  return (
    <Fragment>
      <BodyDiv className="flex flex-col relative pl-6 sm:pl-0 pr-6 pt-10 pb-6">
        <DashboardTableLayoutDiv className="no-scrollbar">
          <div className="flex justify-between items-center">
            <div
              className={`grid grid-cols-1 flex-[3] ${
                "custom-grid-md-" + invoiceWidgets.length
              } gap-6 md:gap-5`}
            >
              {invoiceWidgets.map((data) => (
                <InfoCard {...data} />
              ))}
            </div>

            <div className="flex items-center flex-[2] justify-end gap-4">
              <Button variant="outline" size={"lg"} className="font-sfpro">
                Quick invoice
              </Button>
              <Button
                size={"lg"}
                className="font-sfpro bg-[#FF5701] hover:bg-opacity-80 hover:bg-[#ff5701] focus:bg-[#ff5701]"
                onClick={createInvoice}
              >
                Create invoice
              </Button>
            </div>
          </div>

          <InvoiceTable />
        </DashboardTableLayoutDiv>
      </BodyDiv>
    </Fragment>
  );
};
