
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Download, Share2, Copy } from "lucide-react";
import { QRData, QROptions } from "@/pages/Index";
import { toast } from "@/hooks/use-toast";

interface QRCodePreviewProps {
  qrData: QRData;
  qrOptions: QROptions;
}

export const QRCodePreview = ({ qrData, qrOptions }: QRCodePreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>("");

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

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return;

      const content = generateQRContent(qrData);
      
      try {
        await QRCode.toCanvas(canvasRef.current, content, {
          width: qrOptions.width,
          margin: qrOptions.margin,
          color: {
            dark: qrOptions.color,
            light: qrOptions.backgroundColor,
          },
          errorCorrectionLevel: qrOptions.errorCorrectionLevel,
        });

        // Generate data URL for download
        const dataURL = canvasRef.current.toDataURL("image/png");
        setQrCodeDataURL(dataURL);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQR();
  }, [qrData, qrOptions]);

  const downloadQR = () => {
    if (!qrCodeDataURL) return;

    const link = document.createElement("a");
    link.download = `qr-code-${qrData.type}-${Date.now()}.png`;
    link.href = qrCodeDataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "QR Code Downloaded",
      description: "Your QR code has been saved to your device.",
    });
  };

  const copyQR = async () => {
    if (!qrCodeDataURL) return;

    try {
      const response = await fetch(qrCodeDataURL);
      const blob = await response.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);

      toast({
        title: "QR Code Copied",
        description: "QR code has been copied to your clipboard.",
      });
    } catch (error) {
      console.error("Error copying QR code:", error);
      toast({
        title: "Copy Failed",
        description: "Unable to copy QR code to clipboard.",
        variant: "destructive",
      });
    }
  };

  const shareQR = async () => {
    if (!qrCodeDataURL) return;

    try {
      const response = await fetch(qrCodeDataURL);
      const blob = await response.blob();
      const file = new File([blob], `qr-code-${qrData.type}.png`, { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "QR Code",
          text: `Check out this QR code for ${qrData.type}`,
          files: [file],
        });
      } else {
        // Fallback to download
        downloadQR();
      }
    } catch (error) {
      console.error("Error sharing QR code:", error);
      downloadQR();
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">QR Code Preview</h3>
      
      <div className="bg-white p-6 rounded-xl border-2 border-gray-100 flex justify-center">
        <canvas 
          ref={canvasRef} 
          className="max-w-full h-auto rounded-lg shadow-sm"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <div className="space-y-3">
        <Button 
          onClick={downloadQR} 
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          disabled={!qrCodeDataURL}
        >
          <Download className="w-4 h-4 mr-2" />
          Download PNG
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={copyQR} 
            variant="outline"
            disabled={!qrCodeDataURL}
            className="border-purple-200 hover:bg-purple-50"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          
          <Button 
            onClick={shareQR} 
            variant="outline"
            disabled={!qrCodeDataURL}
            className="border-purple-200 hover:bg-purple-50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-2">QR Code Info</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p><span className="font-medium">Type:</span> {qrData.type.toUpperCase()}</p>
          <p><span className="font-medium">Size:</span> {qrOptions.width}x{qrOptions.width}px</p>
          <p><span className="font-medium">Error Correction:</span> {qrOptions.errorCorrectionLevel}</p>
        </div>
      </div>
    </div>
  );
};
