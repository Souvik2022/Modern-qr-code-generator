
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
    <section className="py-20 bg-gradient-to-br from-warm-gray to-cream dark:from-slate-800 dark:to-coffee-brown">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-montserrat mb-6 text-coffee-brown dark:text-cream">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-stone to-coffee-brown bg-clip-text text-transparent">
              QR Template
            </span>
          </h2>
          <p className="text-xl text-coffee-brown/70 dark:text-warm-gray max-w-3xl mx-auto">
            Start with a pre-designed template for your specific use case.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => {
            const IconComponent = template.icon;
            return (
              <Card 
                key={template.id} 
                className="relative p-6 bg-cream/90 dark:bg-coffee-brown/90 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl group cursor-pointer overflow-hidden"
                onClick={() => onSelectTemplate(template.id)}
              >
                {template.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-stone to-coffee-brown text-cream text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                
                <div className={`w-14 h-14 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-coffee-brown dark:text-cream mb-2 font-montserrat">
                  {template.title}
                </h3>
                
                <p className="text-coffee-brown/70 dark:text-warm-gray text-sm mb-3 leading-relaxed">
                  {template.description}
                </p>
                
                <div className="text-xs text-coffee-brown/50 dark:text-stone mb-4 font-mono bg-warm-gray dark:bg-stone/20 px-3 py-2 rounded-lg">
                  {template.example}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-gradient-to-r group-hover:from-stone group-hover:to-coffee-brown group-hover:text-cream group-hover:border-transparent transition-all duration-200"
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
