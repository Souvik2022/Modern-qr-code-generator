
import { QrCode, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                QRGen Pro
              </h1>
              <p className="text-sm text-slate-500 font-medium">Professional QR Generator</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl px-4 py-2 font-medium transition-all duration-200"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share App
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl px-6 py-2 font-semibold shadow-lg shadow-indigo-200 transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              Get Pro
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
