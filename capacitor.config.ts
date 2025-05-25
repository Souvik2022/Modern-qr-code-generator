
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.cdf3c095f26a4489895cb640b11eb152',
  appName: 'QRGen Pro',
  webDir: 'dist',
  server: {
    url: 'https://cdf3c095-f26a-4489-895c-b640b11eb152.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#8B5CF6',
      showSpinner: false
    }
  }
};

export default config;
