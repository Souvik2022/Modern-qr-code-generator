
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const scrollToFAQ = () => {
    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPlans = () => {
    document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-white/80 backdrop-blur-2xl border-b border-slate-200/30 sticky top-0 z-50 shadow-lg shadow-slate-200/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/5dd21e98-61bc-4bc2-b50e-74b3b997dbfc.png" 
              alt="Scanly Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          <div className="flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Features
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button 
                    onClick={scrollToPlans}
                    className={navigationMenuTriggerStyle()}
                  >
                    Plans
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button 
                    onClick={scrollToFAQ}
                    className={navigationMenuTriggerStyle()}
                  >
                    FAQ
                  </button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button 
              variant="default"
              size="sm" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl px-6 py-2 font-semibold shadow-lg shadow-indigo-200/50 transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
