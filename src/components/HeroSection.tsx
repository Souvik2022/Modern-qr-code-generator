
import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode, Users, Zap, Shield } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-indigo-200 dark:border-indigo-600 mb-8">
            <QrCode className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Professional QR Code Generator
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl lg:text-7xl font-bold font-inter mb-8 leading-tight tracking-tight">
            Create Beautiful{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              QR Codes
            </span>{" "}
            in Seconds
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Generate customizable QR codes for websites, WiFi, contacts, and more. 
            Professional design meets powerful functionality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl shadow-indigo-200 dark:shadow-indigo-900/50 transition-all duration-200 hover:-translate-y-1"
            >
              Start Creating Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200"
            >
              View Examples
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">50K+</div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">QR Codes Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">15+</div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">QR Code Types</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">99.9%</div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
