
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Wifi, User, Mail, Phone, MapPin, Calendar, MessageSquare } from "lucide-react";

const templates = [
  {
    id: "website",
    icon: Globe,
    title: "Website URL",
    description: "Link to your website or landing page",
    example: "https://yourwebsite.com",
    color: "from-blue-500 to-blue-600",
    popular: true
  },
  {
    id: "wifi",
    icon: Wifi,
    title: "WiFi Network",
    description: "Share WiFi credentials instantly",
    example: "MyNetwork - WPA2",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    id: "contact",
    icon: User,
    title: "Contact Card",
    description: "Share your contact information",
    example: "John Doe - CEO",
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "email",
    icon: Mail,
    title: "Email Address",
    description: "Direct email contact",
    example: "hello@company.com",
    color: "from-red-500 to-red-600"
  },
  {
    id: "phone",
    icon: Phone,
    title: "Phone Number",
    description: "One-tap phone calling",
    example: "+1 (555) 123-4567",
    color: "from-green-500 to-green-600"
  },
  {
    id: "location",
    icon: MapPin,
    title: "Location",
    description: "Share address or coordinates",
    example: "123 Main St, City",
    color: "from-orange-500 to-orange-600"
  },
  {
    id: "event",
    icon: Calendar,
    title: "Calendar Event",
    description: "Add events to calendar",
    example: "Meeting - Dec 25",
    color: "from-pink-500 to-pink-600"
  },
  {
    id: "text",
    icon: MessageSquare,
    title: "Plain Text",
    description: "Share any text content",
    example: "Custom message",
    color: "from-slate-500 to-slate-600"
  }
];

interface QRTemplatesProps {
  onSelectTemplate: (type: string) => void;
}

export const QRTemplates = ({ onSelectTemplate }: QRTemplatesProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-montserrat mb-6 text-slate-800 dark:text-slate-100">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              QR Template
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Start with a pre-designed template for your specific use case.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => {
            const IconComponent = template.icon;
            return (
              <Card 
                key={template.id} 
                className="relative p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border-0 shadow-xl rounded-2xl group cursor-pointer overflow-hidden hover:-translate-y-1 transition-all duration-200"
                onClick={() => onSelectTemplate(template.id)}
              >
                {template.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                
                <div className={`w-14 h-14 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center mb-4`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 font-montserrat">
                  {template.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 leading-relaxed">
                  {template.description}
                </p>
                
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-mono bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg">
                  {template.example}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-200"
                >
                  Use Template
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
