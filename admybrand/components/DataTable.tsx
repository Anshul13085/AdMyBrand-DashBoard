"use client";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";
import { tableData } from "@/lib/tableData";
import jsPDF from "jspdf";
import autoTable, { CellInput } from "jspdf-autotable";

type Campaign = {
  campaign: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: string;
};

const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "campaign",
    header: "Campaign",
  },
  {
    accessorKey: "impressions",
    header: "Impressions",
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    accessorKey: "conversions",
    header: "Conversions",
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
];

export default function DataTable() {
  const [sorting, setSorting] = useState<import("@tanstack/react-table").SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      globalFilter: filtering,
      pagination: { pageSize, pageIndex },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onPaginationChange: (updater) => {
      // updater can be a function or a value
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Export to CSV
  const exportCSV = () => {
    const headers = columns.map(col => col.header).join(",");
    const rows = table.getRowModel().rows.map(row =>
      row.getVisibleCells().map(cell => cell.getContext().getValue()).join(",")
    );
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "campaign_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const headers = columns.map(col => col.header as string);
    const data = table.getRowModel().rows.map(row =>
      row.getVisibleCells().map(cell => cell.getContext().getValue())
    );

    autoTable(doc, {
      head: [headers],
      body: data as CellInput[][],
    });

    doc.save("campaign_data.pdf");
  };

  return (
    <div className="bg-card p-6 rounded-2xl shadow-md w-full overflow-x-auto">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-xl font-semibold">Campaign Performance</h2>
        <input
          placeholder="Search..."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm w-full md:w-64"
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={exportCSV}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
        >
          Export CSV
        </button>
        <button
          onClick={exportPDF}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Export PDF
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="text-left p-3 cursor-pointer select-none"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 text-sm">
        <div>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(0); // reset to first page on size change
            }}
            className="bg-white text-black dark:bg-zinc-900 dark:text-white border border-gray-300 dark:border-zinc-700 rounded px-2 py-1"
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
