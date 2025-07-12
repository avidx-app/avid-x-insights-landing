
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search, BarChart3, Users, Target, Zap, Eye, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-8 h-8" />
            <span className="text-xl font-bold">AvidX</span>
          </div>
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/analyze" className="text-muted-foreground hover:text-foreground transition-colors">Analyze</Link>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#use-cases" className="text-muted-foreground hover:text-foreground transition-colors">Use Cases</a>
            <ThemeToggle />
          </nav>
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Unlock Competitor Intelligence in{" "}
            <span className="text-primary">Minutes</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Analyze up to 5 competitor websites instantly. Get detailed insights on features, pricing, content strategies, and more to stay ahead of the competition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/analyze">
              <Button size="lg" className="text-lg px-8 py-3 h-auto">
                Try Now - It's Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 h-auto">
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Enter URLs</h3>
              <p className="text-muted-foreground">
                Simply paste up to 5 competitor website URLs you want to analyze
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI scans and analyzes each site for key business intelligence
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Get Insights</h3>
              <p className="text-muted-foreground">
                Receive detailed reports on pricing, features, and strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Discover</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
              <Target className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Product Features</h3>
              <p className="text-muted-foreground text-sm">
                Comprehensive analysis of competitor features and capabilities
              </p>
            </Card>
            <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
              <BarChart3 className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Pricing Models</h3>
              <p className="text-muted-foreground text-sm">
                Detailed breakdown of pricing strategies and plans
              </p>
            </Card>
            <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
              <Zap className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">USPs & Positioning</h3>
              <p className="text-muted-foreground text-sm">
                Unique selling propositions and market positioning analysis
              </p>
            </Card>
            <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
              <Search className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">SEO Insights</h3>
              <p className="text-muted-foreground text-sm">
                Keywords, meta tags, and search optimization strategies
              </p>
            </Card>
            <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
              <Eye className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
              <p className="text-muted-foreground text-sm">
                Technology choices and infrastructure insights
              </p>
            </Card>
            <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
              <Users className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Trust Signals</h3>
              <p className="text-muted-foreground text-sm">
                Social proof, certifications, and credibility indicators
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Startup Founders</h3>
              <p className="text-muted-foreground">
                Understand your market, validate pricing, and identify gaps in competitor offerings before launching your product.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Product Managers</h3>
              <p className="text-muted-foreground">
                Stay ahead of feature developments and positioning changes in your competitive landscape.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Marketing Teams</h3>
              <p className="text-muted-foreground">
                Discover content strategies, SEO tactics, and messaging approaches that work in your industry.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Business Analysts</h3>
              <p className="text-muted-foreground">
                Generate comprehensive competitive intelligence reports quickly and efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Ready to Analyze Your Competition?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get started now - no signup required, completely free to use.
          </p>
          <Link to="/analyze">
            <Button size="lg" className="text-lg px-8 py-3 h-auto">
              Start Your Analysis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 AvidX. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
