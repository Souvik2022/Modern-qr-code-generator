import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { QRCodePreview } from "@/components/QRCodePreview";
import { QRCustomization } from "@/components/QRCustomization";
import { LogoUpload } from "@/components/LogoUpload";
import { BatchGenerator } from "@/components/BatchGenerator";
import { AdvancedExport } from "@/components/AdvancedExport";
import { Header } from "@/components/Header";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Globe, Wifi, User, MessageSquare, Mail, Phone, MapPin, Calendar, Layers, Upload } from "lucide-react";

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
  patterns?: {
    bodyType: 'square' | 'circle' | 'rounded' | 'dots';
    eyeType: 'square' | 'circle' | 'rounded';
    eyeBallType: 'square' | 'circle' | 'rounded';
  };
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
    errorCorrectionLevel: 'M',
    patterns: {
      bodyType: 'square',
      eyeType: 'square',
      eyeBallType: 'square'
    }
  });

  const [logo, setLogo] = useState<string | null>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400">
            QR Code Generator Pro
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Create beautiful, customizable QR codes with advanced features. Generate single codes or batch process CSV files.
          </p>
        </div>

        <Tabs defaultValue="single" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="single" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Single QR Code
            </TabsTrigger>
            <TabsTrigger value="batch" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Batch Generator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* QR Type Selection & Input */}
              <div className="lg:col-span-2 space-y-8">
                <Card className="p-8 shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-3xl hover:shadow-3xl transition-all duration-300">
                  <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-200 flex items-center gap-3">
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
                              ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/50"
                              : "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                          }`}
                        >
                          <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            qrData.type === type.id 
                              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" 
                              : "bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800 group-hover:text-indigo-600 dark:group-hover:text-indigo-300"
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

                <Card className="p-8 shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-3xl hover:shadow-3xl transition-all duration-300">
                  <Tabs defaultValue="colors" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="colors">Colors & Size</TabsTrigger>
                      <TabsTrigger value="patterns">Patterns</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="colors">
                      <QRCustomization qrOptions={qrOptions} setQrOptions={setQrOptions} />
                    </TabsContent>
                    
                    <TabsContent value="patterns">
                      <QRPatterns 
                        patternOptions={qrOptions.patterns!} 
                        setPatternOptions={(patterns) => setQrOptions({ ...qrOptions, patterns })} 
                      />
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-600">
                    <LogoUpload onLogoChange={setLogo} currentLogo={logo} />
                  </div>
                </Card>
              </div>

              {/* QR Code Preview */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="p-8 shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-3xl sticky top-8 hover:shadow-3xl transition-all duration-300">
                  <QRCodePreview qrData={qrData} qrOptions={qrOptions} logo={logo} />
                </Card>

                <Card className="p-6 shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-3xl hover:shadow-3xl transition-all duration-300">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Advanced Export</h3>
                  <AdvancedExport qrData={qrData} qrOptions={qrOptions} logo={logo} />
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="batch">
            <div className="max-w-4xl mx-auto">
              <BatchGenerator />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
