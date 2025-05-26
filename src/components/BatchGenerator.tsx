
import { useState, useRef } from "react";
import { Upload, Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import QRCode from "qrcode";
import JSZip from "jszip";

export const BatchGenerator = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
    }
  };

  const processCSV = async () => {
    if (!csvFile) return;

    setIsProcessing(true);
    try {
      const text = await csvFile.text();
      const lines = text.split('\n').filter(line => line.trim());
      const zip = new JSZip();

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const qrDataURL = await QRCode.toDataURL(line, {
            width: 512,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF',
            },
          });
          
          const base64Data = qrDataURL.split(',')[1];
          zip.file(`qr-code-${i + 1}.png`, base64Data, { base64: true });
        }
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-codes-batch.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Batch generated successfully",
        description: `Generated ${lines.length} QR codes.`,
      });
    } catch (error) {
      console.error('Error processing CSV:', error);
      toast({
        title: "Error processing CSV",
        description: "Please check your CSV format and try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadSampleCSV = () => {
    const sampleData = "https://example.com\nhttps://google.com\nhttps://github.com\nHello World\n+1234567890";
    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample-qr-data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Batch QR Generator</h3>
        <p className="text-sm text-gray-600">Upload a CSV file with data to generate multiple QR codes at once.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700">CSV File</Label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 transition-colors mt-2"
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">
              {csvFile ? csvFile.name : "Click to upload CSV file"}
            </p>
            <p className="text-xs text-gray-400 mt-1">One data entry per line</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={processCSV}
            disabled={!csvFile || isProcessing}
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            {isProcessing ? "Processing..." : "Generate & Download ZIP"}
          </Button>
          
          <Button
            onClick={downloadSampleCSV}
            variant="outline"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Sample CSV
          </Button>
        </div>
      </div>
    </Card>
  );
};
