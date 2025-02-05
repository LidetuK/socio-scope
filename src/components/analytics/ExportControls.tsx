import { Button } from "@/components/ui/button";
import { FileText, Download, Mail, Printer } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from 'xlsx';

interface ExportControlsProps {
  data: any;
  onEmailReport: () => void;
}

const ExportControls = ({ data, onEmailReport }: ExportControlsProps) => {
  const handleExportPDF = () => {
    toast.success("Exporting PDF...");
    // TODO: Implement PDF export
  };

  const handleExportExcel = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Report");
      XLSX.writeFile(wb, "demographic_report.xlsx");
      toast.success("Report exported to Excel successfully");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export report");
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={onEmailReport}
      >
        <Mail size={16} />
        Email
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={handlePrintReport}
      >
        <Printer size={16} />
        Print
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={handleExportPDF}
      >
        <FileText size={16} />
        Export PDF
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={handleExportExcel}
      >
        <Download size={16} />
        Export Excel
      </Button>
    </div>
  );
};

export default ExportControls;