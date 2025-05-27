
import { QROptions } from "@/pages/Index";

export const applyPatternStyles = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, qrOptions: QROptions) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const shapeStyle = qrOptions.patterns?.shapeStyle || 'classic';
  
  console.log('Applying pattern style:', shapeStyle);
  
  // Create a new canvas for pattern application
  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = canvas.width;
  patternCanvas.height = canvas.height;
  const patternCtx = patternCanvas.getContext('2d')!;
  
  // Fill with background color
  patternCtx.fillStyle = qrOptions.backgroundColor;
  patternCtx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Analyze QR code structure and apply patterns
  const moduleSize = Math.floor(canvas.width / 25); // Approximate module size
  
  for (let y = 0; y < canvas.height; y += moduleSize) {
    for (let x = 0; x < canvas.width; x += moduleSize) {
      // Sample the center of each module
      const sampleX = Math.min(x + Math.floor(moduleSize / 2), canvas.width - 1);
      const sampleY = Math.min(y + Math.floor(moduleSize / 2), canvas.height - 1);
      const pixelIndex = (sampleY * canvas.width + sampleX) * 4;
      
      // Check if this module is dark (QR code data)
      const isDark = data[pixelIndex] < 128; // Check red channel
      
      if (isDark) {
        patternCtx.fillStyle = qrOptions.color;
        
        // Apply different shapes based on selected style
        switch (shapeStyle) {
          case 'soft-rounded':
            patternCtx.beginPath();
            patternCtx.arc(x + moduleSize/2, y + moduleSize/2, moduleSize/2 * 0.8, 0, 2 * Math.PI);
            patternCtx.fill();
            break;
            
          case 'rounded-square':
            const radius = moduleSize * 0.2;
            patternCtx.beginPath();
            patternCtx.roundRect(x + moduleSize*0.1, y + moduleSize*0.1, moduleSize*0.8, moduleSize*0.8, radius);
            patternCtx.fill();
            break;
            
          case 'dots':
            patternCtx.beginPath();
            patternCtx.arc(x + moduleSize/2, y + moduleSize/2, moduleSize/2 * 0.6, 0, 2 * Math.PI);
            patternCtx.fill();
            break;
            
          case 'diamond':
            patternCtx.beginPath();
            patternCtx.moveTo(x + moduleSize/2, y);
            patternCtx.lineTo(x + moduleSize, y + moduleSize/2);
            patternCtx.lineTo(x + moduleSize/2, y + moduleSize);
            patternCtx.lineTo(x, y + moduleSize/2);
            patternCtx.closePath();
            patternCtx.fill();
            break;
            
          case 'horizontal-lines':
            patternCtx.fillRect(x, y + moduleSize*0.3, moduleSize, moduleSize*0.4);
            break;
            
          case 'vertical-lines':
            patternCtx.fillRect(x + moduleSize*0.3, y, moduleSize*0.4, moduleSize);
            break;
            
          case 'fluid':
            // Create wavy pattern
            patternCtx.beginPath();
            const waveOffset = Math.sin((x + y) / 10) * 2;
            patternCtx.arc(x + moduleSize/2 + waveOffset, y + moduleSize/2, moduleSize/2 * 0.7, 0, 2 * Math.PI);
            patternCtx.fill();
            break;
            
          case 'leaf':
            // Create leaf-like pattern (simplified as rounded with offset)
            patternCtx.beginPath();
            patternCtx.ellipse(x + moduleSize/2, y + moduleSize/2, moduleSize/2 * 0.8, moduleSize/2 * 0.6, Math.PI/4, 0, 2 * Math.PI);
            patternCtx.fill();
            break;
            
          default: // classic
            patternCtx.fillRect(x, y, moduleSize, moduleSize);
            break;
        }
      }
    }
  }
  
  // Copy the pattern canvas back to the original canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(patternCanvas, 0, 0);
};
