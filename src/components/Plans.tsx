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
    <section id="plans" className="py-20 bg-gradient-to-br from-cream via-warm-gray to-stone dark:from-coffee-brown dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold font-montserrat mb-6 text-coffee-brown dark:text-cream">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-stone to-coffee-brown bg-clip-text text-transparent">
              Plan
            </span>
          </h2>
          <p className="text-xl text-coffee-brown/70 dark:text-warm-gray max-w-3xl mx-auto">
            Start free and upgrade when you need advanced features and account management.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`relative p-8 border-0 rounded-3xl transition-transform duration-200 hover:-translate-y-1 ${
                  plan.popular 
                    ? "bg-gradient-to-br from-cream to-warm-gray dark:from-stone/20 dark:to-coffee-brown ring-2 ring-stone/50" 
                    : "bg-cream/90 dark:bg-coffee-brown/90"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-8">
                    <div className="bg-gradient-to-r from-stone to-coffee-brown text-cream px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-left pb-8">
                  <div className={`w-16 h-16 mb-4 rounded-2xl flex items-center justify-center ${
                    plan.popular 
                      ? "bg-gradient-to-r from-stone to-coffee-brown" 
                      : "bg-warm-gray dark:bg-stone"
                  }`}>
                    <Star className={`w-8 h-8 ${plan.popular ? "text-cream" : "text-coffee-brown dark:text-cream"}`} />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-coffee-brown dark:text-cream mb-2">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-coffee-brown dark:text-cream">
                      {plan.price}
                    </span>
                    <span className="text-coffee-brown/70 dark:text-warm-gray ml-2">
                      {plan.period}
                    </span>
                  </div>
                  
                  <p className="text-coffee-brown/70 dark:text-warm-gray">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          plan.popular 
                            ? "bg-gradient-to-r from-stone to-coffee-brown" 
                            : "bg-stone"
                        }`}>
                          <Check className="w-3 h-3 text-cream" />
                        </div>
                        <span className="text-coffee-brown dark:text-warm-gray leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.buttonVariant}
                    size="lg"
                    className={`w-full font-semibold py-3 rounded-xl transition-transform duration-200 hover:-translate-y-1 ${
                      plan.popular 
                        ? "bg-gradient-to-r from-stone to-coffee-brown hover:from-coffee-brown hover:to-stone text-cream" 
                        : "border-2 border-stone dark:border-warm-gray hover:border-coffee-brown dark:hover:border-cream"
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
          <p className="text-coffee-brown/70 dark:text-warm-gray mb-4">
            💡 <strong>Pro Tip:</strong> Login to your account to save all your QR codes, access them from any device, and never lose your work again!
          </p>
          <p className="text-sm text-coffee-brown/50 dark:text-stone">
            All plans include unlimited QR code generation. Pro plan adds account management and advanced features.
          </p>
        </div>
      </div>
    </section>
  );
};
