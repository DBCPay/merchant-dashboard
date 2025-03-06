import invoiceData from "@/data/invoices.json";
import { Invoice } from "@/interfaces";
import { WBtn } from "@/registry/ui/buttons/Button";
import { SearchInput } from "@/registry/ui/inputs/SearchInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  Table as TableType,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
} from "@tanstack/react-table";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  Ellipsis,
  ListFilter,
  Settings,
  X,
} from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import { CustomDropdownMenuCheckboxItem } from "@/registry/ui/drop-down/DropdownMenu";
import pinLogo from "@/assets/icons/pin.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CustomDropdownItem } from "../page";
import { Badge } from "@/registry/ui/badge/Badge";
import { Group, Pagination } from "@mantine/core";
import { Avatar } from "@/registry/ui/avatar/Avatar";
import { extractClientInitials } from "@/helpers";

const invoices = invoiceData as Invoice[];

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoiceId",
    header: "Invoice id",
    cell: ({ row }) => <div>{row.getValue("invoiceId")}</div>,
  },
  // {
  //   accessorKey: "clientId",
  //   header: "Bill To",
  //   cell: ({ row }) => <div>{row.getValue("clientId")}</div>,
  // },
  {
    accessorKey: "clientDetails",
    header: "Bill To",
    cell: ({ row }) => <div>{row.getValue("clientDetails")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <WBtn
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Status
          <ChevronDown />
        </WBtn>
      );
    },
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <WBtn
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Amount
          <ListFilter />
        </WBtn>
      );
    },
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "issuedAt",
    header: ({ column }) => {
      return (
        <WBtn
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Issued
          <ListFilter />
        </WBtn>
      );
    },
  },
  {
    accessorKey: "dueAt",
    header: ({ column }) => {
      return (
        <WBtn
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Due
          <ListFilter />
        </WBtn>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="border-none outline-none">
            <WBtn variant="ghost" className="h-8 w-8 p-0">
              <Ellipsis />
            </WBtn>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="px-2 py-2.5 rounded-lg border-none w-52 drop-shadow-lg"
            align="end"
          >
            <CustomDropdownItem
              // onClick={() => navigator.clipboard.writeText(payment.id)}
              placeholder="Edit invoice"
            />
            <CustomDropdownItem
              // onClick={() => navigator.clipboard.writeText(payment.id)}
              placeholder="Duplicate invoice"
            />
            <CustomDropdownItem
              // onClick={() => navigator.clipboard.writeText(payment.id)}
              placeholder="Print"
            />
            <CustomDropdownItem placeholder="Download as PDF" />
            <CustomDropdownItem placeholder="Share link" />
            <CustomDropdownItem placeholder="Delete" />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const badgeVariantMap: Record<string, any> = {
  Paid: "success",
  "In progress": "gray",
  Refunds: "warning",
  Failed: "error",
};

export const InvoiceTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 100,
  });

  const table = useReactTable({
    data: invoices,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <DashboardGrid className="bg-white rounded-xl overflow-hidden flex-1 grid">
      {/* Table header action sections */}
      <div className="flex items-center px-4">
        <div className="flex items-center gap-4 flex-1">
          <SearchInput
            placeholder="Search..."
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? ""
            }
            onChange={(event: any) =>
              table.getColumn("status")?.setFilterValue(event.target.value)
            }
            className="max-w-80"
          />
          <WBtn variant="outline">
            <Calendar /> This month <ChevronDown />
          </WBtn>
        </div>
        <div className="ml-auto gap-4 flex items-center">
          <WBtn
            size={"icon"}
            variant={"secondary_gray"}
            className="rounded-full"
          >
            <ArrowDownToLine />
          </WBtn>

          <TableSettings table={table} />
        </div>
      </div>

      <div className="rounded-md border flex-1 bg-white p-4 w-full overflow-auto h-full custom-scrollbar no-scrollbar">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    // onClick={() => viewTransactionDetails(row.original)}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => {
                      console.log(cell.id);
                      if (cell.id.includes("amount")) {
                        return (
                          <TableCell
                            key={cell.id}
                            className="font-sfpro text-gray-900 text-sm"
                          >
                            ₦
                            {Number(cell.getValue()).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                        );
                      }
                      if (cell.id.includes("status")) {
                        return (
                          <TableCell key={cell.id}>
                            <Badge
                              variant={
                                badgeVariantMap[
                                  cell.getValue() as keyof typeof badgeVariantMap
                                ]
                              }
                              className="font-sfpro-medium"
                              size={"sm"}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Badge>
                          </TableCell>
                        );
                      }

                      if (cell.id.includes("clientDetails")) {
                        const data =
                          cell.getValue() as Invoice["clientDetails"];
                        return (
                          <TableCell
                            key={cell.id}
                            className="font-sfpro-medium text-gray-900 text-sm"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar
                                imageSrc={data.imageUrl}
                                fallbackText={extractClientInitials(
                                  data.clientName
                                )}
                              />
                              <div>
                                <h4 className="font-urbanist font-semibold text-sm text-[#414651]">
                                  {data.clientName}
                                </h4>
                                <p className="font-sfpro text-sm text-[#535862]">
                                  {data.clientEmail}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell
                          key={cell.id}
                          className="font-sfpro text-gray-900 text-sm"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected. */}
        </div>
        <div className="flex items-center flex-1">
          {/* <Pagination
            value={table.getState().pagination.pageIndex + 1}
            total={table.getPageCount()}
            onChange={(pageIndex: number) => {
              table.setPageIndex(pageIndex - 1);
            }}
          /> */}
          <Pagination.Root
            total={table.getPageCount()}
            value={table.getState().pagination.pageIndex + 1}
            onChange={(pageIndex: number) => {
              table.setPageIndex(pageIndex - 1);
            }}
          >
            <Group gap={5} justify="center">
              {/* <Pagination.First />
              <Pagination.Previous /> */}
              <Pagination.Items />
              {/* <Pagination.Next />
              <Pagination.Last /> */}
            </Group>
          </Pagination.Root>
        </div>
        <div className="space-x-2 flex items-center">
          <WBtn
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft />
            Previous
          </WBtn>
          <WBtn
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ArrowRight />
          </WBtn>
        </div>
      </div>
    </DashboardGrid>
  );
};

const DashboardGrid = styled.div`
  grid-template-rows: 110px 1fr 60px;
`;

type TableSettingProps = {
  table: TableType<Invoice>;
};

function TableSettings({ table }: TableSettingProps) {
  const [tableSettingsOpen, setTableSettingsOpen] = useState(false);

  const changeTableSettingsState = (value: boolean) =>
    setTableSettingsOpen(value);

  const hideTableSettingsDropdown = () => changeTableSettingsState(false);

  return (
    <DropdownMenu
      open={tableSettingsOpen}
      onOpenChange={changeTableSettingsState}
    >
      <DropdownMenuTrigger>
        <WBtn variant="secondary_gray" size={"icon"} className="rounded-full">
          <Settings />
        </WBtn>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-0 py-2 rounded-lg border-none z-20 w-52 drop-shadow-lg bg-white min-w-[200px] max-w-[400px]"
        align="end"
        style={{ boxShadow: "0px 4px 16px #0000001F" }}
      >
        <DropdownMenuLabel className="flex justify-between items-center p-4 pt-2 bg-white cursor-pointer">
          <p className="font-urbanist font-semibold">Table settings</p>
          <X className="size-4" onClick={hideTableSettingsDropdown} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mb-1.5 h-[1px] bg-gray-200" />
        <CustomDropdownMenuCheckboxItem
          key={"billTo"}
          checked={true}
          disabled
          className="capitalize mx-2 py-2 cursor-pointer font-sfpro"
        >
          <div className="flex justify-between items-center flex-1">
            {"Bill To"}
            <img src={pinLogo} />
          </div>
        </CustomDropdownMenuCheckboxItem>
        {table
          .getAllColumns()
          .filter(
            (column) =>
              column.getCanHide() &&
              !["actions", "clientId"].includes(column.id)
          )
          .map((column) => {
            return (
              <CustomDropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                className="capitalize mx-2 py-2 cursor-pointer font-sfpro"
              >
                <div className="flex justify-between items-center flex-1">
                  <>
                    {column.columnDef?.header &&
                    typeof column.columnDef?.header === "string"
                      ? column.columnDef.header
                      : column.id === "issuedAt"
                      ? "Issued"
                      : column.id === "dueAt"
                      ? "Due"
                      : column.id}
                  </>

                  <img src={pinLogo} />
                </div>
              </CustomDropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
