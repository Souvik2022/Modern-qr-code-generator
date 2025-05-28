
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "What types of QR codes can I create?",
      answer: "You can create QR codes for websites, plain text, WiFi networks, contact information, email addresses, phone numbers, locations, and calendar events. Our generator supports all major QR code formats."
    },
    {
      question: "Can I customize the appearance of my QR codes?",
      answer: "Yes! You can customize colors, patterns, sizes, error correction levels, and even add your own logo to make your QR codes match your brand perfectly."
    },
    {
      question: "Do I need to create an account to use QRGen Pro?",
      answer: "You can create basic QR codes without an account. However, logging in allows you to save your QR codes, access your creation history, and use advanced features like batch generation and premium templates."
    },
    {
      question: "What formats can I download my QR codes in?",
      answer: "You can download your QR codes in multiple formats including PNG, JPG, SVG, and PDF. Different formats are suitable for different use cases - SVG for scalable graphics, PNG for web use, and PDF for printing."
    },
    {
      question: "Are there any limits on QR code generation?",
      answer: "Free users can generate unlimited basic QR codes. Premium features like advanced customization, batch generation, and cloud storage require a subscription."
    },
    {
      question: "How do I scan QR codes?",
      answer: "Most modern smartphones can scan QR codes directly through their camera app. Simply point your camera at the QR code and a notification will appear to open the link or content."
    },
    {
      question: "Can I track QR code scans?",
      answer: "With a premium account, you can create trackable QR codes that provide analytics on scan counts, locations, and timing. This is perfect for marketing campaigns and business use."
    },
    {
      question: "What's the difference between error correction levels?",
      answer: "Error correction levels (L, M, Q, H) determine how much damage a QR code can sustain while still being readable. Higher levels add more redundancy but make the code more complex. Level M is recommended for most uses."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold font-mona mb-6 text-slate-800 dark:text-slate-200">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Find answers to common questions about QRGen Pro and QR code generation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-slate-200 dark:border-slate-700 rounded-xl px-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-300 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center p-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-800">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              💡 Pro Tip: Save Your QR Codes
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              Logging in to QRGen Pro allows you to save all your created QR codes, access them from any device, 
              and build a library of your designs. Never lose your work again and streamline your QR code workflow!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
