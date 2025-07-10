
import { Button } from "@/components/ui/button";
import { Card, from "@/components/ui/card";
import { ArrowRight, Search, BarChart3, Users, Target, Zap, Eye, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-900">
              AvidX
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                How it Works
              </a>
              <a href="#use-cases" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Use Cases
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Don't Just Guess About<br />
            <span className="text-gray-700">Your Competition</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Get instant competitor insights from up to 5 websites. Analyze their strategies, 
            compare key metrics, and discover opportunities to outperform them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg font-medium transition-all duration-200"
              onClick={() => window.location.href = '/analyze'}
            >
              Start Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-gray-500">Free • No signup required</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your competitive intelligence<br />companion
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get instant insights from competitor websites you want to analyze
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Input URLs</h3>
              <p className="text-gray-600">
                Enter up to 5 competitor websites you want to analyze and compare
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI scans and analyzes key metrics, content strategies, and performance data
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Insights</h3>
              <p className="text-gray-600">
                Receive detailed competitive insights and actionable recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to<br />stay ahead
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <Target className="h-12 w-12 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">SEO Analysis</h3>
              <p className="text-gray-600">
                Compare keyword strategies, meta tags, and search optimization techniques
              </p>
            </Card>

            <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <TrendingUp className="h-12 w-12 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Metrics</h3>
              <p className="text-gray-600">
                Analyze loading speeds, mobile optimization, and technical performance
              </p>
            </Card>

            <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <Users className="h-12 w-12 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Strategy</h3>
              <p className="text-gray-600">
                Discover content gaps, messaging approaches, and engagement tactics
              </p>
            </Card>

            <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <Zap className="h-12 w-12 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Technology Stack</h3>
              <p className="text-gray-600">
                Identify tools, frameworks, and technologies your competitors use
              </p>
            </Card>

            <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <BarChart3 className="h-12 w-12 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Side-by-Side Comparison</h3>
              <p className="text-gray-600">
                Visual comparisons that highlight strengths, weaknesses, and opportunities
              </p>
            </Card>

            <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <Eye className="h-12 w-12 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Actionable Insights</h3>
              <p className="text-gray-600">
                Clear recommendations on how to improve and outperform competitors
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perfect for every business
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're a startup, agency, or enterprise, competitive intelligence is crucial for growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Startups</h3>
              <p className="text-sm text-gray-600">
                Research market leaders and identify differentiation opportunities
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Marketing Agencies</h3>
              <p className="text-sm text-gray-600">
                Deliver comprehensive competitive analysis reports to clients
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">E-commerce</h3>
              <p className="text-sm text-gray-600">
                Monitor competitor pricing, product strategies, and positioning
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Product Teams</h3>
              <p className="text-sm text-gray-600">
                Analyze feature sets, user experience, and market positioning
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Start Your Analysis
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Compare up to 5 competitors in minutes. No signup required.
          </p>
          <Button 
            size="lg" 
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg font-medium transition-all duration-200"
            onClick={() => window.location.href = '/analyze'}
          >
            Start Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold text-gray-900 mb-4 md:mb-0">
              AvidX
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors duration-200">
                Terms of Service
              </a>
              <span>© 2024 AvidX. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
