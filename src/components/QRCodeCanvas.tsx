
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { QRData, QROptions } from "@/pages/Index";
import { applyPatternStyles } from "@/utils/qrPatternUtils";

interface QRCodeCanvasProps {
  qrData: QRData;
  qrOptions: QROptions;
  logo?: string | null;
  onQRGenerated: (dataURL: string) => void;
}

export const QRCodeCanvas = ({ qrData, qrOptions, logo, onQRGenerated }: QRCodeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        // Generate basic QR code first
        await QRCode.toCanvas(canvasRef.current, content, {
          width: qrOptions.width,
          margin: qrOptions.margin,
          color: {
            dark: qrOptions.color,
            light: qrOptions.backgroundColor,
          },
          errorCorrectionLevel: qrOptions.errorCorrectionLevel,
        });

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Apply pattern styles if not classic
        if (qrOptions.patterns?.shapeStyle && qrOptions.patterns.shapeStyle !== 'classic') {
          applyPatternStyles(canvasRef.current, ctx, qrOptions);
        }

        // Add logo if provided
        if (logo) {
          const img = new Image();
          img.onload = () => {
            const logoSize = qrOptions.width * 0.2;
            const x = (qrOptions.width - logoSize) / 2;
            const y = (qrOptions.width - logoSize) / 2;
            
            // Draw white background for logo
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
            
            // Draw logo
            ctx.drawImage(img, x, y, logoSize, logoSize);
            
            // Update data URL
            const dataURL = canvasRef.current!.toDataURL("image/png");
            onQRGenerated(dataURL);
          };
          img.src = logo;
        } else {
          // Generate data URL without logo
          const dataURL = canvasRef.current.toDataURL("image/png");
          onQRGenerated(dataURL);
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQR();
  }, [qrData, qrOptions, logo, onQRGenerated]);

  return (
    <canvas 
      ref={canvasRef} 
      className="max-w-full h-auto rounded-lg"
      style={{ imageRendering: "pixelated" }}
    />
  );
};
