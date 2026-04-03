"use client";

import { FileSpreadsheet, FileText, FileDown } from "lucide-react";

export default function ExportButtons() {
  const handleExport = () => {
    alert("Exportación en desarrollo");
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExport}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green/10 text-green hover:bg-green/20 border border-green/20"
      >
        <FileSpreadsheet className="w-3.5 h-3.5" />
        Excel
      </button>
      <button
        onClick={handleExport}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red/10 text-red hover:bg-red/20 border border-red/20"
      >
        <FileText className="w-3.5 h-3.5" />
        PDF
      </button>
      <button
        onClick={handleExport}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 border border-accent-blue/20"
      >
        <FileDown className="w-3.5 h-3.5" />
        CSV
      </button>
    </div>
  );
}
