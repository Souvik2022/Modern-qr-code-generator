import { useState } from "react";
import { Download, FileImage, FileType, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Export Format</Label>
        <Select value={exportFormat} onValueChange={(value: 'png' | 'svg' | 'pdf') => setExportFormat(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="png">PNG (Raster)</SelectItem>
            <SelectItem value="svg">SVG (Vector)</SelectItem>
            <SelectItem value="pdf">PDF Document</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleExport}
        disabled={isExporting}
        className="w-full"
      >
        <IconComponent className="w-4 h-4 mr-2" />
        {isExporting ? "Exporting..." : `Export as ${exportFormat.toUpperCase()}`}
      </Button>
    </div>
  );
};
