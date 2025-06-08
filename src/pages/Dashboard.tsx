
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Plus,
  QrCode,
  Eye,
  TrendingUp,
  Star
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface SavedQRCode {
  id: string;
  type: string;
  title: string;
  content: string;
  createdAt: string;
  scans: number;
  isActive: boolean;
}

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock data for saved QR codes
  const savedQRCodes: SavedQRCode[] = [
    {
      id: "1",
      type: "URL",
      title: "Company Website",
      content: "https://company.com",
      createdAt: "2024-06-01",
      scans: 145,
      isActive: true
    },
    {
      id: "2", 
      type: "VCARD",
      title: "Business Card",
      content: "John Doe Contact",
      createdAt: "2024-06-02",
      scans: 89,
      isActive: true
    },
    {
      id: "3",
      type: "WIFI",
      title: "Office WiFi",
      content: "OfficeNet",
      createdAt: "2024-06-03",
      scans: 234,
      isActive: true
    }
  ];

  const stats = {
    totalQRCodes: 3,
    totalScans: 426,
    activeQRCodes: 3,
    premiumFeatures: "Unlimited"
  };

  const filteredQRCodes = savedQRCodes.filter(qr => 
    qr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    qr.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "URL": return "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300";
      case "VCARD": return "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300";
      case "WIFI": return "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total QR Codes</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.totalQRCodes}</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <QrCode className="w-8 h-8 text-slate-400" />
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Scans</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.totalScans}</p>
                <p className="text-sm text-green-600">+28% from last month</p>
              </div>
              <Eye className="w-8 h-8 text-slate-400" />
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active QR Codes</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.activeQRCodes}</p>
                <p className="text-sm text-green-600">+5% from last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-slate-400" />
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Premium Features</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.premiumFeatures}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Full access</p>
              </div>
              <Star className="w-8 h-8 text-slate-400" />
            </div>
          </Card>
        </div>

        {/* Your QR Codes Section */}
        <Card className="p-6 bg-white dark:bg-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Your QR Codes</h2>
              <p className="text-slate-600 dark:text-slate-400">Manage and track your premium QR codes</p>
            </div>
            <Button className="mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create QR Code
            </Button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search QR codes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {selectedType}
              </Button>
              
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* QR Codes Grid */}
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {filteredQRCodes.map((qr) => (
              <Card key={qr.id} className="p-6 border hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <Badge className={`text-xs px-2 py-1 ${getTypeColor(qr.type)}`}>
                    {qr.type}
                  </Badge>
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                    {/* Mock QR Code placeholder */}
                    <div className="w-12 h-12 bg-black rounded grid grid-cols-3 gap-px">
                      {Array.from({length: 9}).map((_, i) => (
                        <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'bg-black' : ''}`} />
                      ))}
                    </div>
                  </div>
                </div>
                
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{qr.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 truncate">{qr.content}</p>
                
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>Created: {qr.createdAt}</span>
                  <span>{qr.scans} scans</span>
                </div>
              </Card>
            ))}
          </div>

          {filteredQRCodes.length === 0 && (
            <div className="text-center py-12">
              <QrCode className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">No QR codes found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or create your first QR code.</p>
            </div>
          )}
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
