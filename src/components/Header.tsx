
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
  return (
    <header className="bg-white/80 backdrop-blur-2xl border-b border-slate-200/30 sticky top-0 z-50 shadow-lg shadow-slate-200/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
              <QrCode className="w-7 h-7 text-white relative z-10" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                QRGen Pro
              </h1>
            </div>
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
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Plans
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    FAQ
                  </NavigationMenuLink>
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
