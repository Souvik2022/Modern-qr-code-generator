import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Download, Share2, Copy, Globe, Wifi, User, MessageSquare, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { QRData, QROptions } from "@/pages/Index";
import { toast } from "@/hooks/use-toast";

interface QRCodePreviewProps {
  qrData: QRData;
  qrOptions: QROptions;
  logo?: string | null;
}

export const QRCodePreview = ({ qrData, qrOptions, logo }: QRCodePreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>("");

  const getQRTypeStyles = (type: string) => {
    const styles = {
      url: { bg: "from-blue-500 to-blue-600", icon: Globe, iconColor: "text-white" },
      text: { bg: "from-slate-500 to-slate-600", icon: MessageSquare, iconColor: "text-white" },
      wifi: { bg: "from-cyan-500 to-cyan-600", icon: Wifi, iconColor: "text-white" },
      contact: { bg: "from-purple-500 to-purple-600", icon: User, iconColor: "text-white" },
      email: { bg: "from-red-500 to-red-600", icon: Mail, iconColor: "text-white" },
      phone: { bg: "from-green-500 to-green-600", icon: Phone, iconColor: "text-white" },
      location: { bg: "from-orange-500 to-orange-600", icon: MapPin, iconColor: "text-white" },
      event: { bg: "from-pink-500 to-pink-600", icon: Calendar, iconColor: "text-white" }
    };
    return styles[type as keyof typeof styles] || styles.url;
  };

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

  const applyPatternStyles = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const shapeStyle = qrOptions.patterns?.shapeStyle || 'classic';
    
    console.log('Applying pattern style:', shapeStyle);
    
    // Create a new canvas for pattern application
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = canvas.width;
    patternCanvas.height = canvas.height;
    const patternCtx = patternCanvas.getContext('2d')!;
    
    // Fill with background color
    patternCtx.fillStyle = qrOptions.backgroundColor;
    patternCtx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Analyze QR code structure and apply patterns
    const moduleSize = Math.floor(canvas.width / 25); // Approximate module size
    
    for (let y = 0; y < canvas.height; y += moduleSize) {
      for (let x = 0; x < canvas.width; x += moduleSize) {
        // Sample the center of each module
        const sampleX = Math.min(x + Math.floor(moduleSize / 2), canvas.width - 1);
        const sampleY = Math.min(y + Math.floor(moduleSize / 2), canvas.height - 1);
        const pixelIndex = (sampleY * canvas.width + sampleX) * 4;
        
        // Check if this module is dark (QR code data)
        const isDark = data[pixelIndex] < 128; // Check red channel
        
        if (isDark) {
          patternCtx.fillStyle = qrOptions.color;
          
          // Apply different shapes based on selected style
          switch (shapeStyle) {
            case 'circle':
            case 'soft-rounded':
              patternCtx.beginPath();
              patternCtx.arc(x + moduleSize/2, y + moduleSize/2, moduleSize/2 * 0.8, 0, 2 * Math.PI);
              patternCtx.fill();
              break;
              
            case 'rounded-square':
            case 'rounded':
              const radius = moduleSize * 0.2;
              patternCtx.beginPath();
              patternCtx.roundRect(x + moduleSize*0.1, y + moduleSize*0.1, moduleSize*0.8, moduleSize*0.8, radius);
              patternCtx.fill();
              break;
              
            case 'dots':
              patternCtx.beginPath();
              patternCtx.arc(x + moduleSize/2, y + moduleSize/2, moduleSize/2 * 0.6, 0, 2 * Math.PI);
              patternCtx.fill();
              break;
              
            case 'diamond':
              patternCtx.beginPath();
              patternCtx.moveTo(x + moduleSize/2, y);
              patternCtx.lineTo(x + moduleSize, y + moduleSize/2);
              patternCtx.lineTo(x + moduleSize/2, y + moduleSize);
              patternCtx.lineTo(x, y + moduleSize/2);
              patternCtx.closePath();
              patternCtx.fill();
              break;
              
            case 'horizontal-lines':
              patternCtx.fillRect(x, y + moduleSize*0.3, moduleSize, moduleSize*0.4);
              break;
              
            case 'vertical-lines':
              patternCtx.fillRect(x + moduleSize*0.3, y, moduleSize*0.4, moduleSize);
              break;
              
            case 'fluid':
              // Create wavy pattern
              patternCtx.beginPath();
              const waveOffset = Math.sin((x + y) / 10) * 2;
              patternCtx.arc(x + moduleSize/2 + waveOffset, y + moduleSize/2, moduleSize/2 * 0.7, 0, 2 * Math.PI);
              patternCtx.fill();
              break;
              
            default: // classic
              patternCtx.fillRect(x, y, moduleSize, moduleSize);
              break;
          }
        }
      }
    }
    
    // Copy the pattern canvas back to the original canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(patternCanvas, 0, 0);
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
          applyPatternStyles(canvasRef.current, ctx);
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
            setQrCodeDataURL(dataURL);
          };
          img.src = logo;
        } else {
          // Generate data URL without logo
          const dataURL = canvasRef.current.toDataURL("image/png");
          setQrCodeDataURL(dataURL);
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQR();
  }, [qrData, qrOptions, logo]);

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

  const typeStyles = getQRTypeStyles(qrData.type);
  const IconComponent = typeStyles.icon;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
        <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        QR Code Preview
      </h3>
      
      {/* Styled QR Code Container */}
      <div className={`relative bg-gradient-to-br ${typeStyles.bg} p-8 rounded-3xl shadow-2xl overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-12 h-12 border-4 border-white rounded-full"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-4 border-white rounded-lg"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-10 h-10 border-4 border-white rounded-lg"></div>
        </div>
        
        {/* Brand Icon */}
        <div className="absolute top-6 left-6 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        
        {/* QR Code */}
        <div className="flex justify-center pt-4">
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <canvas 
              ref={canvasRef} 
              className="max-w-full h-auto rounded-lg"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </div>
        
        {/* Type Label */}
        <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
          <span className="text-white font-semibold text-sm uppercase tracking-wide">
            {qrData.type}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          onClick={downloadQR} 
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl py-6 text-lg font-semibold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 transition-all duration-200 hover:shadow-xl hover:scale-105"
          disabled={!qrCodeDataURL}
        >
          <Download className="w-5 h-5 mr-3" />
          Download Styled QR Code
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={copyQR} 
            variant="outline"
            disabled={!qrCodeDataURL}
            className="border-indigo-200 dark:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-500 rounded-xl py-3 font-semibold transition-all duration-200"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          
          <Button 
            onClick={shareQR} 
            variant="outline"
            disabled={!qrCodeDataURL}
            className="border-indigo-200 dark:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-500 rounded-xl py-3 font-semibold transition-all duration-200"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-700 dark:to-indigo-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-600">
        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          QR Code Details
        </h4>
        <div className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Type:</span> 
            <span className="bg-white dark:bg-slate-600 px-3 py-1 rounded-lg font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              {qrData.type}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Size:</span> 
            <span>{qrOptions.width}x{qrOptions.width}px</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Error Correction:</span> 
            <span>{qrOptions.errorCorrectionLevel}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Pattern Style:</span> 
            <span className="capitalize">{qrOptions.patterns?.shapeStyle || 'classic'}</span>
          </div>
          {logo && (
            <div className="flex justify-between">
              <span className="font-medium">Logo:</span> 
              <span className="text-green-600 dark:text-green-400">✓ Included</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
