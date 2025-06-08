import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Wifi, 
  User, 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Instagram,
  Twitter,
  Facebook,
  Linkedin
} from "lucide-react";

interface Template {
  id: string;
  type: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  gradient: string;
}

interface QRTemplatesProps {
  onSelectTemplate: (type: string) => void;
}

const templates: Template[] = [
  {
    id: "website",
    type: "url",
    icon: Globe,
    title: "Website URL",
    description: "Direct users to your website or a specific page.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "wifi",
    type: "wifi",
    icon: Wifi,
    title: "WiFi Network",
    description: "Share your WiFi network details easily.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "contact",
    type: "contact",
    icon: User,
    title: "Contact Info",
    description: "Share contact details like name, phone, and email.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "text",
    type: "text",
    icon: MessageSquare,
    title: "Plain Text",
    description: "Encode any text or message into a QR code.",
    gradient: "from-orange-500 to-yellow-500"
  },
  {
    id: "email",
    type: "email",
    icon: Mail,
    title: "Email Address",
    description: "Allow users to quickly send an email to a specified address.",
    gradient: "from-red-500 to-rose-500"
  },
  {
    id: "phone",
    type: "phone",
    icon: Phone,
    title: "Phone Number",
    description: "Enable users to quickly dial a phone number.",
    gradient: "from-teal-500 to-lime-500"
  },
  {
    id: "location",
    type: "location",
    icon: MapPin,
    title: "Geographic Location",
    description: "Share a specific geographic location on a map.",
    gradient: "from-fuchsia-500 to-violet-500"
  },
  {
    id: "event",
    type: "event",
    icon: Calendar,
    title: "Calendar Event",
    description: "Create and share calendar events with all details.",
    gradient: "from-sky-500 to-indigo-500"
  },
  {
    id: "instagram",
    type: "url",
    icon: Instagram,
    title: "Instagram Profile",
    description: "Link directly to an Instagram profile.",
    gradient: "from-pink-600 to-rose-600"
  },
  {
    id: "twitter",
    type: "url",
    icon: Twitter,
    title: "Twitter Profile",
    description: "Share your Twitter profile with a QR code.",
    gradient: "from-blue-600 to-sky-600"
  },
  {
    id: "facebook",
    type: "url",
    icon: Facebook,
    title: "Facebook Page",
    description: "Direct users to your Facebook page.",
    gradient: "from-blue-700 to-blue-500"
  },
  {
    id: "linkedin",
    type: "url",
    icon: Linkedin,
    title: "LinkedIn Profile",
    description: "Share your LinkedIn profile for professional networking.",
    gradient: "from-indigo-500 to-blue-500"
  }
];

export const QRTemplates = ({ onSelectTemplate }: QRTemplatesProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-inter mb-6 text-slate-800 dark:text-slate-100 tracking-tight">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              QR Template
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Select from our professionally designed templates to get started quickly.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {templates.map((template) => {
            const IconComponent = template.icon;
            return (
              <Card 
                key={template.id} 
                className="group p-6 bg-white/90 dark:bg-slate-800/90 border-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer rounded-2xl"
                onClick={() => onSelectTemplate(template.type)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${template.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 font-inter tracking-tight">
                  {template.title}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {template.description}
                </p>
                
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-medium group-hover:shadow-lg transition-all duration-300"
                >
                  Create QR Code
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
