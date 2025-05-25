
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            QR Code Generator
          </h1>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Create beautiful, customizable QR codes for any purpose. Generate codes for websites, WiFi, contacts, and more with Material Design principles.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* QR Type Selection & Input */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-lg rounded-3xl hover:shadow-3xl transition-all duration-300">
              <h2 className="text-3xl font-bold mb-8 text-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                Choose QR Code Type
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {qrTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setQrData({ ...qrData, type: type.id, content: "" })}
                      className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        qrData.type === type.id
                          ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-700 shadow-lg shadow-indigo-100"
                          : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        qrData.type === type.id 
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" 
                          : "bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold">{type.label}</span>
                    </button>
                  );
                })}
              </div>

              <QRCodeGenerator qrData={qrData} setQrData={setQrData} />
            </Card>

            <Card className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-lg rounded-3xl hover:shadow-3xl transition-all duration-300">
              <QRCustomization qrOptions={qrOptions} setQrOptions={setQrOptions} />
            </Card>
          </div>

          {/* QR Code Preview */}
          <div className="lg:col-span-1">
            <Card className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-lg rounded-3xl sticky top-8 hover:shadow-3xl transition-all duration-300">
              <QRCodePreview qrData={qrData} qrOptions={qrOptions} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
