"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  FileText,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Slide } from "@/lib/types";
import { exportToPDF, exportToPPTX } from "@/lib/export-service";

interface ExportOptionsProps {
  slides: Slide[];
}

export function ExportOptions({ slides }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState<'pdf' | 'pptx' | null>(null);
  const { toast } = useToast();

  const handleExportPDF = async () => {
    setIsExporting('pdf');
    try {
      await exportToPDF(slides);
      toast({
        title: "PDF Export Successful",
        description: "Your deck has been exported as a PDF.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your deck.",
        variant: "destructive",
      });
      console.error("PDF export error:", error);
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportPPTX = async () => {
    setIsExporting('pptx');
    try {
      await exportToPPTX(slides);
      toast({
        title: "PowerPoint Export Successful",
        description: "Your deck has been exported as a PowerPoint file.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your deck.",
        variant: "destructive",
      });
      console.error("PPTX export error:", error);
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
        <Button
          onClick={handleExportPDF}
          variant="outline"
          disabled={isExporting !== null}
          className="flex-1"
        >
          {isExporting === 'pdf' ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FileText className="mr-2 h-4 w-4" />
          )}
          Export as PDF
        </Button>
        <Button
          onClick={handleExportPPTX}
          variant="outline"
          disabled={isExporting !== null}
          className="flex-1"
        >
          {isExporting === 'pptx' ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Export as PowerPoint
        </Button>
      </CardContent>
    </Card>
  );
}