
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { QROptions } from "@/pages/Index";

interface QRCustomizationProps {
  qrOptions: QROptions;
  setQrOptions: (options: QROptions) => void;
}

export const QRCustomization = ({ qrOptions, setQrOptions }: QRCustomizationProps) => {
  const updateOption = (key: keyof QROptions, value: any) => {
    setQrOptions({ ...qrOptions, [key]: value });
  };

  const presetColors = [
    { name: "Black", value: "#000000" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F59E0B" },
  ];

  const presetBackgrounds = [
    { name: "White", value: "#FFFFFF" },
    { name: "Light Gray", value: "#F3F4F6" },
    { name: "Light Blue", value: "#EFF6FF" },
    { name: "Light Purple", value: "#F3E8FF" },
    { name: "Light Green", value: "#ECFDF5" },
    { name: "Light Yellow", value: "#FFFBEB" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Foreground Color */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Foreground Color</Label>
          <div className="flex items-center space-x-3">
            <Input
              type="color"
              value={qrOptions.color}
              onChange={(e) => updateOption("color", e.target.value)}
              className="w-12 h-10 p-1 border-gray-300"
            />
            <Input
              type="text"
              value={qrOptions.color}
              onChange={(e) => updateOption("color", e.target.value)}
              placeholder="#000000"
              className="flex-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {presetColors.map((color) => (
              <button
                key={color.value}
                onClick={() => updateOption("color", color.value)}
                className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-purple-500 transition-colors"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Background Color */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Background Color</Label>
          <div className="flex items-center space-x-3">
            <Input
              type="color"
              value={qrOptions.backgroundColor}
              onChange={(e) => updateOption("backgroundColor", e.target.value)}
              className="w-12 h-10 p-1 border-gray-300"
            />
            <Input
              type="text"
              value={qrOptions.backgroundColor}
              onChange={(e) => updateOption("backgroundColor", e.target.value)}
              placeholder="#FFFFFF"
              className="flex-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {presetBackgrounds.map((color) => (
              <button
                key={color.value}
                onClick={() => updateOption("backgroundColor", color.value)}
                className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-purple-500 transition-colors"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Size */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Size: {qrOptions.width}px</Label>
          <Slider
            value={[qrOptions.width]}
            onValueChange={(value) => updateOption("width", value[0])}
            min={128}
            max={512}
            step={32}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>128px</span>
            <span>512px</span>
          </div>
        </div>

        {/* Margin */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Margin: {qrOptions.margin}</Label>
          <Slider
            value={[qrOptions.margin]}
            onValueChange={(value) => updateOption("margin", value[0])}
            min={0}
            max={8}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>8</span>
          </div>
        </div>
      </div>

      {/* Error Correction Level */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Error Correction Level</Label>
        <Select 
          value={qrOptions.errorCorrectionLevel} 
          onValueChange={(value: 'L' | 'M' | 'Q' | 'H') => updateOption("errorCorrectionLevel", value)}
        >
          <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">Low (~7%)</SelectItem>
            <SelectItem value="M">Medium (~15%)</SelectItem>
            <SelectItem value="Q">Quartile (~25%)</SelectItem>
            <SelectItem value="H">High (~30%)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Higher error correction allows the QR code to be readable even when partially damaged.
        </p>
      </div>
    </div>
  );
};
