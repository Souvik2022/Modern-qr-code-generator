
import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LogoUploadProps {
  onLogoChange: (logo: string | null) => void;
  currentLogo: string | null;
}

export const LogoUpload = ({ onLogoChange, currentLogo }: LogoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onLogoChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onLogoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-gray-700">Logo (Optional)</Label>
      
      {currentLogo ? (
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 border border-gray-300 rounded-lg overflow-hidden">
            <img src={currentLogo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <Button
            onClick={removeLogo}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4 mr-1" />
            Remove
          </Button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 transition-colors"
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600">Click to upload logo</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
