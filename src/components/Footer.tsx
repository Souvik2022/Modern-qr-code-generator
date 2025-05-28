
import { Button } from "@/components/ui/button";
import { QrCode, Github, Twitter, Mail, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-mona">QRGen Pro</h3>
                <p className="text-sm text-slate-400">Professional QR Generator</p>
              </div>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Create beautiful, customizable QR codes for any purpose. Professional tools for businesses and creators.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-mona">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">QR Generator</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Batch Generator</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">API Access</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Templates</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Analytics</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-mona">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Best Practices</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Examples</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-mona">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © {currentYear} QRGen Pro. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm flex items-center mt-2 md:mt-0">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for creators worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
