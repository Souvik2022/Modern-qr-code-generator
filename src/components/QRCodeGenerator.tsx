
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QRData } from "@/pages/Index";

interface QRCodeGeneratorProps {
  qrData: QRData;
  setQrData: (data: QRData) => void;
}

export const QRCodeGenerator = ({ qrData, setQrData }: QRCodeGeneratorProps) => {
  const updateContent = (content: string) => {
    setQrData({ ...qrData, content });
  };

  const updateWifi = (field: string, value: string) => {
    setQrData({
      ...qrData,
      wifi: { ...qrData.wifi, [field]: value } as any
    });
  };

  const updateContact = (field: string, value: string) => {
    setQrData({
      ...qrData,
      contact: { ...qrData.contact, [field]: value } as any
    });
  };

  const updateEvent = (field: string, value: string) => {
    setQrData({
      ...qrData,
      event: { ...qrData.event, [field]: value } as any
    });
  };

  const renderInputFields = () => {
    switch (qrData.type) {
      case "url":
        return (
          <div className="space-y-3">
            <Label htmlFor="url" className="text-sm font-medium text-gray-700">Website URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={qrData.content}
              onChange={(e) => updateContent(e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        );

      case "text":
        return (
          <div className="space-y-3">
            <Label htmlFor="text" className="text-sm font-medium text-gray-700">Text Content</Label>
            <Textarea
              id="text"
              placeholder="Enter your text here..."
              value={qrData.content}
              onChange={(e) => updateContent(e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 min-h-[100px]"
            />
          </div>
        );

      case "wifi":
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="ssid" className="text-sm font-medium text-gray-700">Network Name (SSID)</Label>
              <Input
                id="ssid"
                placeholder="WiFi Network Name"
                value={qrData.wifi?.ssid || ""}
                onChange={(e) => updateWifi("ssid", e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="WiFi Password"
                value={qrData.wifi?.password || ""}
                onChange={(e) => updateWifi("password", e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="security" className="text-sm font-medium text-gray-700">Security Type</Label>
              <Select value={qrData.wifi?.security || "WPA"} onValueChange={(value) => updateWifi("security", value)}>
                <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">No Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={qrData.contact?.name || ""}
                onChange={(e) => updateContact("name", e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={qrData.contact?.phone || ""}
                onChange={(e) => updateContact("phone", e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={qrData.contact?.email || ""}
                onChange={(e) => updateContact("email", e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="organization" className="text-sm font-medium text-gray-700">Organization</Label>
              <Input
                id="organization"
                placeholder="Company Name"
                value={qrData.contact?.organization || ""}
                onChange={(e) => updateContact("organization", e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
        );

      case "email":
        return (
          <div className="space-y-3">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="contact@example.com"
              value={qrData.content}
              onChange={(e) => updateContent(e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        );

      case "phone":
        return (
          <div className="space-y-3">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={qrData.content}
              onChange={(e) => updateContent(e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        );

      case "location":
        return (
          <div className="space-y-3">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location (Coordinates or Address)</Label>
            <Input
              id="location"
              placeholder="40.7128,-74.0060 or 123 Main St, New York"
              value={qrData.content}
              onChange={(e) => updateContent(e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        );

      case "event":
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">Event Title</Label>
              <Input
                id="title"
                placeholder="Meeting Title"
                value={qrData.event?.title || ""}
                onChange={(e) => updateEvent("title", e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="start" className="text-sm font-medium text-gray-700">Start Date & Time</Label>
                <Input
                  id="start"
                  type="datetime-local"
                  value={qrData.event?.start || ""}
                  onChange={(e) => updateEvent("start", e.target.value)}
                  className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="end" className="text-sm font-medium text-gray-700">End Date & Time</Label>
                <Input
                  id="end"
                  type="datetime-local"
                  value={qrData.event?.end || ""}
                  onChange={(e) => updateEvent("end", e.target.value)}
                  className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="event-location" className="text-sm font-medium text-gray-700">Location</Label>
              <Input
                id="event-location"
                placeholder="Meeting Room or Address"
                value={qrData.event?.location || ""}
                onChange={(e) => updateEvent("location", e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
              <Textarea
                id="description"
                placeholder="Event description..."
                value={qrData.event?.description || ""}
                onChange={(e) => updateEvent("description", e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Enter Information</h3>
      {renderInputFields()}
    </div>
  );
};
