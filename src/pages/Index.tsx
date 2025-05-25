
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { QRCodePreview } from "@/components/QRCodePreview";
import { QRCustomization } from "@/components/QRCustomization";
import { Header } from "@/components/Header";
import { Globe, Wifi, User, MessageSquare, Mail, Phone, MapPin, Calendar } from "lucide-react";

export interface QRData {
  type: string;
  content: string;
  wifi?: {
    ssid: string;
    password: string;
    security: string;
  };
  contact?: {
    name: string;
    phone: string;
    email: string;
    organization: string;
  };
  event?: {
    title: string;
    start: string;
    end: string;
    location: string;
    description: string;
  };
}

export interface QROptions {
  color: string;
  backgroundColor: string;
  width: number;
  margin: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

const Index = () => {
  const [qrData, setQrData] = useState<QRData>({
    type: "url",
    content: ""
  });

  const [qrOptions, setQrOptions] = useState<QROptions>({
    color: "#000000",
    backgroundColor: "#FFFFFF",
    width: 256,
    margin: 2,
    errorCorrectionLevel: 'M'
  });

  const qrTypes = [
    { id: "url", label: "Website URL", icon: Globe },
    { id: "text", label: "Plain Text", icon: MessageSquare },
    { id: "wifi", label: "WiFi Network", icon: Wifi },
    { id: "contact", label: "Contact Info", icon: User },
    { id: "email", label: "Email", icon: Mail },
    { id: "phone", label: "Phone", icon: Phone },
    { id: "location", label: "Location", icon: MapPin },
    { id: "event", label: "Calendar Event", icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            QR Code Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create beautiful, customizable QR codes for any purpose. Generate codes for websites, WiFi, contacts, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* QR Type Selection & Input */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Choose QR Code Type</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {qrTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setQrData({ ...qrData, type: type.id, content: "" })}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                        qrData.type === type.id
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 bg-white hover:border-purple-300"
                      }`}
                    >
                      <IconComponent className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-xs font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>

              <QRCodeGenerator qrData={qrData} setQrData={setQrData} />
            </Card>

            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <QRCustomization qrOptions={qrOptions} setQrOptions={setQrOptions} />
            </Card>
          </div>

          {/* QR Code Preview */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm sticky top-8">
              <QRCodePreview qrData={qrData} qrOptions={qrOptions} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
