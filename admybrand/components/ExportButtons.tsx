"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import jsPDF from "jspdf";

const mockData = [
  ["Metric", "Value"],
  ["Revenue", "$120,000"],
  ["Users", "10,240"],
  ["Conversions", "1,245"],
  ["Growth", "5.3%"],
];

export default function ExportButtons() {
  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      mockData.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dashboard_metrics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Dashboard Metrics", 10, 10);

    mockData.slice(1).forEach((row, i) => {
      doc.text(`${row[0]}: ${row[1]}`, 10, 20 + i * 10);
    });

    doc.save("dashboard_metrics.pdf");
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleExportCSV} variant="outline">
        <Download className="w-4 h-4 mr-2" />
        Export CSV
      </Button>
      <Button onClick={handleExportPDF} variant="outline">
        <Download className="w-4 h-4 mr-2" />
        Export PDF
      </Button>
    </div>
  );
}
