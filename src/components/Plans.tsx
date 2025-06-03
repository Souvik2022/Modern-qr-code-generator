
import { Check, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Plans = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for personal use and testing",
      features: [
        "Unlimited basic QR codes",
        "Standard customization options",
        "PNG & JPG downloads",
        "Basic error correction",
        "No account required"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "Advanced features for professionals and businesses",
      features: [
        "Everything in Free",
        "Account & cloud storage",
        "QR code history & management",
        "Advanced customization & patterns",
        "Logo embedding",
        "Batch generation",
        "SVG & PDF exports",
        "Analytics & tracking",
        "Priority support"
      ],
      buttonText: "Login to Upgrade",
      buttonVariant: "default" as const,
      popular: true
    }
  ];

  return (
    <section id="plans" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold font-mona mb-6 text-slate-800 dark:text-slate-200">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Plan
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Start free and upgrade when you need advanced features and account management.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`relative p-8 shadow-2xl border-0 backdrop-blur-lg rounded-3xl hover:shadow-3xl transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 ring-2 ring-indigo-500/50" 
                    : "bg-white/90 dark:bg-slate-800/90"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-8">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-left pb-8">
                  <div className={`w-16 h-16 mb-4 rounded-2xl flex items-center justify-center ${
                    plan.popular 
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600" 
                      : "bg-slate-100 dark:bg-slate-700"
                  }`}>
                    {plan.popular ? (
                      <Star className="w-8 h-8 text-white" />
                    ) : (
                      <Star className="w-8 h-8 text-slate-600 dark:text-slate-300" />
                    )}
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-800 dark:text-slate-200">
                      {plan.price}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 ml-2">
                      {plan.period}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-300">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          plan.popular 
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600" 
                            : "bg-green-500"
                        }`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.buttonVariant}
                    size="lg"
                    className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                      plan.popular 
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200/50" 
                        : "border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-600"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            💡 <strong>Pro Tip:</strong> Login to your account to save all your QR codes, access them from any device, and never lose your work again!
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            All plans include unlimited QR code generation. Pro plan adds account management and advanced features.
          </p>
        </div>
      </div>
    </section>
  );
};
