"use client";

import { FileSpreadsheet, FileText, FileDown } from "lucide-react";

interface ExportButtonsProps {
  data: Record<string, unknown>[];
  filename: string;
  columns?: { key: string; label: string }[];
}

function getColumns(data: Record<string, unknown>[], columns?: { key: string; label: string }[]) {
  if (columns && columns.length > 0) return columns;
  if (data.length === 0) return [];
  return Object.keys(data[0]).map((key) => ({ key, label: key }));
}

function toCsvString(data: Record<string, unknown>[], cols: { key: string; label: string }[]): string {
  const header = cols.map((c) => `"${c.label}"`).join(",");
  const rows = data.map((row) =>
    cols
      .map((c) => {
        const val = row[c.key];
        const str = val === null || val === undefined ? "" : String(val);
        return `"${str.replace(/"/g, '""')}"`;
      })
      .join(",")
  );
  return [header, ...rows].join("\r\n");
}

function downloadBlob(content: string, filename: string, mime: string, bom = false) {
  const parts: BlobPart[] = bom ? ["\uFEFF", content] : [content];
  const blob = new Blob(parts, { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function ExportButtons({ data, filename, columns }: ExportButtonsProps) {
  const cols = getColumns(data, columns);

  const handleCsv = () => {
    if (data.length === 0) return;
    const csv = toCsvString(data, cols);
    downloadBlob(csv, `${filename}.csv`, "text/csv;charset=utf-8;");
  };

  const handleExcel = () => {
    if (data.length === 0) return;
    const csv = toCsvString(data, cols);
    downloadBlob(csv, `${filename}.xls`, "application/vnd.ms-excel;charset=utf-8;", true);
  };

  const handlePdf = () => {
    if (data.length === 0) return;
    const headerCells = cols.map((c) => `<th style="border:1px solid #ccc;padding:8px 12px;background:#0D1B2A;color:#fff;font-size:13px;text-align:left">${c.label}</th>`).join("");
    const bodyRows = data
      .map(
        (row) =>
          `<tr>${cols
            .map((c) => {
              const val = row[c.key];
              return `<td style="border:1px solid #e5e7eb;padding:6px 12px;font-size:13px">${val ?? ""}</td>`;
            })
            .join("")}</tr>`
      )
      .join("");
    const html = `<!DOCTYPE html><html><head><title>${filename}</title><style>body{font-family:system-ui,sans-serif;padding:32px}table{border-collapse:collapse;width:100%}h1{color:#0D1B2A;font-size:20px;margin-bottom:16px}</style></head><body><h1>${filename}</h1><table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></body></html>`;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
      win.print();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExcel}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-colors"
      >
        <FileSpreadsheet className="w-3.5 h-3.5" />
        Excel
      </button>
      <button
        onClick={handlePdf}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
      >
        <FileText className="w-3.5 h-3.5" />
        PDF
      </button>
      <button
        onClick={handleCsv}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
      >
        <FileDown className="w-3.5 h-3.5" />
        CSV
      </button>
    </div>
  );
}
