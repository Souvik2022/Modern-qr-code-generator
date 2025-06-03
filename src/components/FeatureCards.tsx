
import { Card } from "@/components/ui/card";
import { 
  Palette, 
  Download, 
  Zap, 
  Shield, 
  Smartphone, 
  BarChart3,
  Users,
  Globe,
  Layers,
  Settings,
  FileImage,
  QrCode
} from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Custom Design",
    description: "Choose from multiple patterns, colors, and styles to match your brand perfectly.",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Download in PNG, SVG, PDF formats with high resolution for any use case.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Create QR codes instantly with real-time preview and immediate download.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "No Registration",
    description: "Generate unlimited QR codes without signup. Your data stays private.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Perfect for mobile devices with responsive design and touch-friendly interface.",
    gradient: "from-purple-500 to-violet-500"
  },
  {
    icon: QrCode,
    title: "15+ QR Types",
    description: "URLs, WiFi, contacts, events, emails, phone numbers, and many more.",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: FileImage,
    title: "Logo Integration",
    description: "Add your logo or brand image to make your QR codes more professional.",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description: "Generate multiple QR codes at once from CSV files for bulk operations.",
    gradient: "from-red-500 to-pink-500"
  }
];

export const FeatureCards = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-mona mb-6 text-slate-800 dark:text-slate-200">
            Why Choose Our{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              QR Generator?
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Powerful features designed for professionals, creators, and businesses of all sizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-mona">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
