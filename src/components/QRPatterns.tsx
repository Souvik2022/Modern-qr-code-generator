
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QRPatternOptions {
  bodyType: 'square' | 'circle' | 'rounded' | 'dots';
  eyeType: 'square' | 'circle' | 'rounded';
  eyeBallType: 'square' | 'circle' | 'rounded';
  shapeStyle: 'classic' | 'rounded-square' | 'soft-rounded' | 'dots' | 'diamond' | 'leaf' | 'horizontal-lines' | 'vertical-lines' | 'fluid';
}

interface QRPatternsProps {
  patternOptions: QRPatternOptions;
  setPatternOptions: (options: QRPatternOptions) => void;
}

export const QRPatterns = ({ patternOptions, setPatternOptions }: QRPatternsProps) => {
  const updatePattern = (key: keyof QRPatternOptions, value: string) => {
    setPatternOptions({ ...patternOptions, [key]: value });
  };

  const shapeStyles = [
    { 
      value: 'classic', 
      label: 'Classic',
      visual: '■■■\n■□■\n■■■'
    },
    { 
      value: 'rounded-square', 
      label: 'Rounded Square',
      visual: '▢▢▢\n▢□▢\n▢▢▢'
    },
    { 
      value: 'soft-rounded', 
      label: 'Soft Rounded',
      visual: '●●●\n●○●\n●●●'
    },
    { 
      value: 'dots', 
      label: 'Dots',
      visual: '● ● ●\n ● ● \n● ● ●'
    },
    { 
      value: 'diamond', 
      label: 'Diamond',
      visual: ' ◆ \n◆◇◆\n ◆ '
    },
    { 
      value: 'leaf', 
      label: 'Leaf',
      visual: '🍃🍃🍃\n🍃 🍃\n🍃🍃🍃'
    },
    { 
      value: 'horizontal-lines', 
      label: 'Horizontal',
      visual: '▬▬▬\n   \n▬▬▬'
    },
    { 
      value: 'vertical-lines', 
      label: 'Vertical',
      visual: '| | |\n| | |\n| | |'
    },
    { 
      value: 'fluid', 
      label: 'Fluid',
      visual: '∼∼∼\n∼○∼\n∼∼∼'
    }
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
      
      {/* Shape Style */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Shape Style</Label>
        <RadioGroup 
          value={patternOptions.shapeStyle || 'classic'} 
          onValueChange={(value) => updatePattern('shapeStyle', value)}
          className="grid grid-cols-3 gap-4"
        >
          {shapeStyles.map((style) => (
            <div key={style.value} className="relative">
              <RadioGroupItem 
                value={style.value} 
                id={`shape-${style.value}`}
                className="peer sr-only"
              />
              <label 
                htmlFor={`shape-${style.value}`} 
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-purple-300 peer-checked:border-purple-500 peer-checked:bg-purple-50 dark:peer-checked:bg-purple-900/20 dark:border-gray-600 dark:hover:border-purple-600"
              >
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2 flex items-center justify-center text-xs font-mono whitespace-pre-line text-center leading-none overflow-hidden">
                  {style.visual}
                </div>
                <span className="text-xs font-medium text-center">{style.label}</span>
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Corner Eyes */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Corner Eyes</Label>
        <RadioGroup 
          value={patternOptions.eyeType} 
          onValueChange={(value) => updatePattern('eyeType', value)}
          className="flex gap-4"
        >
          {eyePatterns.map((pattern) => (
            <div key={pattern.value} className="flex items-center space-x-2">
              <RadioGroupItem value={pattern.value} id={`eye-${pattern.value}`} />
              <label 
                htmlFor={`eye-${pattern.value}`} 
                className="text-sm font-medium cursor-pointer"
              >
                {pattern.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Eye Centers */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Eye Centers</Label>
        <RadioGroup 
          value={patternOptions.eyeBallType} 
          onValueChange={(value) => updatePattern('eyeBallType', value)}
          className="flex gap-4"
        >
          {eyeBallPatterns.map((pattern) => (
            <div key={pattern.value} className="flex items-center space-x-2">
              <RadioGroupItem value={pattern.value} id={`eyeball-${pattern.value}`} />
              <label 
                htmlFor={`eyeball-${pattern.value}`} 
                className="text-sm font-medium cursor-pointer"
              >
                {pattern.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-700 dark:to-indigo-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
        <p className="text-xs text-slate-600 dark:text-slate-300">
          <strong>Note:</strong> Shape styles will be applied to downloaded QR codes. The preview shows a simplified version.
        </p>
      </div>
    </div>
  );
};
