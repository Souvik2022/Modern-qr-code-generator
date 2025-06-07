import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, Copy, Globe, Wifi, User, MessageSquare, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { QRData, QROptions } from "@/pages/Index";
import { toast } from "@/hooks/use-toast";
import { QRCodeCanvas } from "./QRCodeCanvas";

interface QRCodePreviewProps {
  qrData: QRData;
  qrOptions: QROptions;
  logo?: string | null;
}

export const QRCodePreview = ({ qrData, qrOptions, logo }: QRCodePreviewProps) => {
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
      <div className={`relative bg-gradient-to-br ${typeStyles.bg} p-8 rounded-3xl overflow-hidden`}>
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
          <div className="bg-white p-4 rounded-2xl">
            <QRCodeCanvas 
              qrData={qrData} 
              qrOptions={qrOptions} 
              logo={logo} 
              onQRGenerated={setQrCodeDataURL}
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
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl py-6 text-lg font-semibold transition-transform duration-200 hover:-translate-y-1"
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
            className="border-indigo-200 dark:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-500 rounded-xl py-3 font-semibold transition-transform duration-200 hover:-translate-y-1"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          
          <Button 
            onClick={shareQR} 
            variant="outline"
            disabled={!qrCodeDataURL}
            className="border-indigo-200 dark:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-500 rounded-xl py-3 font-semibold transition-transform duration-200 hover:-translate-y-1"
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
