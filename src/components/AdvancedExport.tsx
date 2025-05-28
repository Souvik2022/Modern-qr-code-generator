import { useState } from "react";
import { Download, FileImage, FileType, File, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { QRData, QROptions } from "@/pages/Index";
import { toast } from "@/hooks/use-toast";
import QRCode from "qrcode";
import jsPDF from "jspdf";

interface AdvancedExportProps {
  qrData: QRData;
  qrOptions: QROptions;
  logo?: string | null;
}

export const AdvancedExport = ({ qrData, qrOptions, logo }: AdvancedExportProps) => {
  const [exportFormat, setExportFormat] = useState<'png' | 'svg' | 'pdf'>('png');
  const [isExporting, setIsExporting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const generateQRContent = (data: QRData): string => {
    switch (data.type) {
      case "url":
        return data.content || "https://example.com";
      case "text":
        return data.content || "Sample text";
      case "wifi":
        if (!data.wifi?.ssid) return "WIFI:T:WPA;S:SampleNetwork;P:password123;;";
        return `WIFI:T:${data.wifi.security || "WPA"};S:${data.wifi.ssid};P:${data.wifi.password || ""};;`;
      case "contact":
        if (!data.contact?.name) return "BEGIN:VCARD\nVERSION:3.0\nFN:Sample Contact\nEND:VCARD";
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${data.contact.name}\nTEL:${data.contact.phone || ""}\nEMAIL:${data.contact.email || ""}\nORG:${data.contact.organization || ""}\nEND:VCARD`;
      case "email":
        return `mailto:${data.content || "example@example.com"}`;
      case "phone":
        return `tel:${data.content || "+1234567890"}`;
      case "location":
        const coords = data.content || "40.7128,-74.0060";
        if (coords.includes(",") && !coords.includes(" ")) {
          return `geo:${coords}`;
        }
        return `geo:0,0?q=${encodeURIComponent(coords)}`;
      case "event":
        if (!data.event?.title) return "BEGIN:VEVENT\nSUMMARY:Sample Event\nEND:VEVENT";
        return `BEGIN:VEVENT\nSUMMARY:${data.event.title}\nDTSTART:${data.event.start?.replace(/[-:]/g, "").replace("T", "") || ""}\nDTEND:${data.event.end?.replace(/[-:]/g, "").replace("T", "") || ""}\nLOCATION:${data.event.location || ""}\nDESCRIPTION:${data.event.description || ""}\nEND:VEVENT`;
      default:
        return data.content || "https://example.com";
    }
  };

  const exportPNG = async () => {
    const content = generateQRContent(qrData);
    const dataURL = await QRCode.toDataURL(content, {
      width: qrOptions.width,
      margin: qrOptions.margin,
      color: {
        dark: qrOptions.color,
        light: qrOptions.backgroundColor,
      },
      errorCorrectionLevel: qrOptions.errorCorrectionLevel,
    });

    const link = document.createElement("a");
    link.download = `qr-code-${qrData.type}-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
  };

  const exportSVG = async () => {
    const content = generateQRContent(qrData);
    const svgString = await QRCode.toString(content, {
      type: 'svg',
      width: qrOptions.width,
      margin: qrOptions.margin,
      color: {
        dark: qrOptions.color,
        light: qrOptions.backgroundColor,
      },
      errorCorrectionLevel: qrOptions.errorCorrectionLevel,
    });

    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `qr-code-${qrData.type}-${Date.now()}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = async () => {
    const content = generateQRContent(qrData);
    const dataURL = await QRCode.toDataURL(content, {
      width: 400,
      margin: qrOptions.margin,
      color: {
        dark: qrOptions.color,
        light: qrOptions.backgroundColor,
      },
      errorCorrectionLevel: qrOptions.errorCorrectionLevel,
    });

    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text(`QR Code - ${qrData.type.toUpperCase()}`, 20, 30);
    pdf.addImage(dataURL, 'PNG', 20, 50, 100, 100);
    pdf.save(`qr-code-${qrData.type}-${Date.now()}.pdf`);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      switch (exportFormat) {
        case 'png':
          await exportPNG();
          break;
        case 'svg':
          await exportSVG();
          break;
        case 'pdf':
          await exportPDF();
          break;
      }
      toast({
        title: "Export successful",
        description: `QR code exported as ${exportFormat.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getIcon = () => {
    switch (exportFormat) {
      case 'png': return FileImage;
      case 'svg': return FileType;
      case 'pdf': return File;
      default: return FileImage;
    }
  };

  const IconComponent = getIcon();

  return (
    <div className="space-y-4">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
            <Settings className="w-4 h-4 mr-2" />
            Export Options
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Export Settings</SheetTitle>
            <SheetDescription>
              Choose your export format and download your QR code.
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Export Format</Label>
              <Select value={exportFormat} onValueChange={(value: 'png' | 'svg' | 'pdf') => setExportFormat(value)}>
                <SelectTrigger className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600">
                  <SelectItem value="png" className="hover:bg-gray-100 dark:hover:bg-slate-600">
                    <div className="flex items-center gap-2">
                      <FileImage className="w-4 h-4" />
                      <div>
                        <div className="font-medium">PNG (Raster)</div>
                        <div className="text-xs text-gray-500">Best for web use</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="svg" className="hover:bg-gray-100 dark:hover:bg-slate-600">
                    <div className="flex items-center gap-2">
                      <FileType className="w-4 h-4" />
                      <div>
                        <div className="font-medium">SVG (Vector)</div>
                        <div className="text-xs text-gray-500">Scalable for print</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="pdf" className="hover:bg-gray-100 dark:hover:bg-slate-600">
                    <div className="flex items-center gap-2">
                      <File className="w-4 h-4" />
                      <div>
                        <div className="font-medium">PDF Document</div>
                        <div className="text-xs text-gray-500">Ready to print</div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => {
                handleExport();
                setIsOpen(false);
              }}
              disabled={isExporting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {isExporting ? "Exporting..." : `Export as ${exportFormat.toUpperCase()}`}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Quick export buttons for desktop */}
      <div className="hidden lg:flex gap-2">
        <Button
          onClick={() => {
            setExportFormat('png');
            handleExport();
          }}
          variant="outline"
          size="sm"
          className="flex-1"
          disabled={isExporting}
        >
          <FileImage className="w-3 h-3 mr-1" />
          PNG
        </Button>
        <Button
          onClick={() => {
            setExportFormat('svg');
            handleExport();
          }}
          variant="outline"
          size="sm"
          className="flex-1"
          disabled={isExporting}
        >
          <FileType className="w-3 h-3 mr-1" />
          SVG
        </Button>
        <Button
          onClick={() => {
            setExportFormat('pdf');
            handleExport();
          }}
          variant="outline"
          size="sm"
          className="flex-1"
          disabled={isExporting}
        >
          <File className="w-3 h-3 mr-1" />
          PDF
        </Button>
      </div>
    </div>
  );
};
