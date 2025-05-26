
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QRPatternOptions {
  bodyType: 'square' | 'circle' | 'rounded' | 'dots';
  eyeType: 'square' | 'circle' | 'rounded';
  eyeBallType: 'square' | 'circle' | 'rounded';
}

interface QRPatternsProps {
  patternOptions: QRPatternOptions;
  setPatternOptions: (options: QRPatternOptions) => void;
}

export const QRPatterns = ({ patternOptions, setPatternOptions }: QRPatternsProps) => {
  const updatePattern = (key: keyof QRPatternOptions, value: string) => {
    setPatternOptions({ ...patternOptions, [key]: value });
  };

  const bodyPatterns = [
    { value: 'square', label: 'Square', preview: '■■■' },
    { value: 'circle', label: 'Circles', preview: '●●●' },
    { value: 'rounded', label: 'Rounded', preview: '▢▢▢' },
    { value: 'dots', label: 'Dots', preview: '···' }
  ];

  const eyePatterns = [
    { value: 'square', label: 'Square' },
    { value: 'circle', label: 'Circle' },
    { value: 'rounded', label: 'Rounded' }
  ];

  const eyeBallPatterns = [
    { value: 'square', label: 'Square' },
    { value: 'circle', label: 'Circle' },
    { value: 'rounded', label: 'Rounded' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Pattern Styles</h3>
      
      {/* Body Pattern */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Body Pattern</Label>
        <RadioGroup 
          value={patternOptions.bodyType} 
          onValueChange={(value) => updatePattern('bodyType', value)}
          className="grid grid-cols-2 gap-3"
        >
          {bodyPatterns.map((pattern) => (
            <div key={pattern.value} className="flex items-center space-x-2">
              <RadioGroupItem value={pattern.value} id={`body-${pattern.value}`} />
              <label 
                htmlFor={`body-${pattern.value}`} 
                className="flex items-center gap-2 text-sm font-medium cursor-pointer"
              >
                <span className="text-lg font-mono">{pattern.preview}</span>
                {pattern.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Eye Pattern */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Corner Eyes</Label>
        <Select 
          value={patternOptions.eyeType} 
          onValueChange={(value: 'square' | 'circle' | 'rounded') => updatePattern('eyeType', value)}
        >
          <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {eyePatterns.map((pattern) => (
              <SelectItem key={pattern.value} value={pattern.value}>
                {pattern.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Eye Ball Pattern */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Eye Centers</Label>
        <Select 
          value={patternOptions.eyeBallType} 
          onValueChange={(value: 'square' | 'circle' | 'rounded') => updatePattern('eyeBallType', value)}
        >
          <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {eyeBallPatterns.map((pattern) => (
              <SelectItem key={pattern.value} value={pattern.value}>
                {pattern.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-700 dark:to-indigo-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
        <p className="text-xs text-slate-600 dark:text-slate-300">
          <strong>Note:</strong> Pattern styles will be applied to downloaded QR codes. The preview shows a simplified version.
        </p>
      </div>
    </div>
  );
};
