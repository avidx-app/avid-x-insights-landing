
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Globe, Loader2, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

interface AnalysisData {
  urls: string[];
  report: {
    productFeatures: string;
    pricingModels: string;
    uniqueSellingProps: string;
    contentStrategies: string;
    seoInsights: string;
    techStack: string;
    trustSignals: string;
  };
}

const Analyze = () => {
  const [urls, setUrls] = useState<string[]>(['', '', '']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleAnalyze = async () => {
    const validUrls = urls.filter(url => url.trim() !== '');
    if (validUrls.length === 0) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate API call with progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setProgress(100);
    clearInterval(progressInterval);

    // Generate dummy analysis data
    const dummyAnalysis: AnalysisData = {
      urls: validUrls,
      report: {
        productFeatures: `**Product/Service Features Analysis**\n\nBased on the analysis of ${validUrls.length} competitor websites, here are the key product features identified:\n\n• **Core Features**: Most competitors offer similar core functionalities including dashboard analytics, real-time monitoring, and custom reporting capabilities.\n\n• **Unique Features**: Site A offers advanced AI-powered insights, Site B provides industry-specific templates, while Site C focuses on collaboration tools.\n\n• **Feature Gaps**: Opportunity exists in mobile-first design and API integrations that competitors haven't fully explored.\n\n• **User Experience**: Competitors vary significantly in UX complexity, with some offering simplified interfaces while others provide comprehensive but complex dashboards.`,
        
        pricingModels: `**Pricing Models Comparison**\n\nThe competitive landscape shows diverse pricing approaches:\n\n• **Freemium Models**: 60% of analyzed competitors offer free tiers with limited features\n\n• **Subscription Tiers**: Most common structure is 3-tier pricing (Basic, Pro, Enterprise)\n\n• **Price Ranges**: \n  - Basic: $19-49/month\n  - Professional: $99-199/month\n  - Enterprise: $299-999/month\n\n• **Billing Options**: Annual discounts range from 15-25% across competitors\n\n• **Value Propositions**: Higher tiers typically unlock advanced analytics, team collaboration, and priority support`,
        
        uniqueSellingProps: `**Unique Selling Propositions**\n\nEach competitor has distinct positioning:\n\n• **Competitor A**: "AI-First Analytics Platform" - Emphasizes machine learning capabilities and predictive insights\n\n• **Competitor B**: "Industry Specialist" - Focuses on vertical-specific solutions and compliance features\n\n• **Competitor C**: "Simplicity & Speed" - Positions as the easiest-to-use solution with fastest setup\n\n• **Market Gaps**: Opportunity for positioning around data privacy, real-time collaboration, or small business focus\n\n• **Differentiation Opportunities**: Integration ecosystem, customer support quality, and onboarding experience`,
        
        contentStrategies: `**Content Strategy Analysis**\n\nContent approaches vary significantly across competitors:\n\n• **Blog Frequency**: Range from 2-8 posts per month, with industry leaders publishing 4-6 weekly\n\n• **Content Types**:\n  - How-to guides and tutorials (85% of competitors)\n  - Industry reports and whitepapers (60%)\n  - Case studies and success stories (70%)\n  - Webinars and video content (45%)\n\n• **SEO Content**: Most focus on long-tail keywords and problem-solution content\n\n• **Thought Leadership**: 40% actively publish original research and industry insights\n\n• **Content Gaps**: Opportunity in interactive content, community-driven content, and micro-learning formats`,
        
        seoInsights: `**SEO Performance Insights**\n\nTechnical and content SEO analysis reveals:\n\n• **Keyword Strategies**: \n  - Primary keywords: "analytics platform", "business intelligence", "data visualization"\n  - Long-tail focus on problem-solving queries\n  - Average keyword density: 1.2-1.8%\n\n• **Technical SEO**:\n  - Page load speeds: 2.1-4.5 seconds (room for improvement)\n  - Mobile responsiveness: 90% fully optimized\n  - Core Web Vitals: Mixed performance across competitors\n\n• **Content Structure**: Most use H1-H3 hierarchy effectively, with 60% using FAQ schemas\n\n• **Meta Optimization**: Title tags average 45-60 characters, meta descriptions 140-160 characters\n\n• **Backlink Profiles**: Domain authority ranges from 35-65, with opportunities in niche publications`,
        
        techStack: `**Technology Stack Analysis**\n\nDetected technologies across competitor websites:\n\n• **Frontend Frameworks**:\n  - React.js (40% of competitors)\n  - Vue.js (25%)\n  - Angular (20%)\n  - Custom solutions (15%)\n\n• **Backend & Infrastructure**:\n  - Node.js and Express (35%)\n  - Python/Django (25%)\n  - Cloud platforms: AWS (60%), Google Cloud (25%), Azure (15%)\n\n• **Analytics & Tracking**:\n  - Google Analytics (100%)\n  - Mixpanel or Amplitude (65%)\n  - Hotjar or similar (45%)\n\n• **Performance**: CDN usage (80%), image optimization varies significantly\n\n• **Security**: SSL certificates (100%), security headers implementation (70%)`,
        
        trustSignals: `**Trust Signals & Social Proof**\n\nTrust-building elements identified:\n\n• **Certifications & Badges**:\n  - SOC 2 compliance (60% display prominently)\n  - GDPR compliance badges (75%)\n  - Industry certifications (ISO, etc.) (40%)\n\n• **Social Proof**:\n  - Customer testimonials (85% of sites)\n  - Case studies with metrics (70%)\n  - Customer logos/brands (90%)\n  - User review scores (55%)\n\n• **Authority Indicators**:\n  - Media mentions and press coverage (45%)\n  - Industry awards and recognition (35%)\n  - Team expertise and credentials (60%)\n\n• **Trust Factors**: Money-back guarantees (30%), free trials (80%), transparent pricing (75%)\n\n• **Opportunities**: Enhanced security messaging, customer success stories, and community testimonials`
      }
    };

    setAnalysisData(dummyAnalysis);
    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setAnalysisData(null);
    setUrls(['', '', '']);
    setProgress(0);
  };

  if (analysisData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={resetAnalysis} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                New Analysis
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Competitor Analysis Report</h1>
                <p className="text-muted-foreground mt-1">
                  Analysis of {analysisData.urls.length} competitor{analysisData.urls.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Analyzed URLs Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analyzed Websites</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analysisData.urls.map((url, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm truncate">{url}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Analysis Report Canvas */}
            <div className="lg:col-span-3">
              <Card className="min-h-[800px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Comprehensive Competitor Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <div className="space-y-8">
                    {Object.entries(analysisData.report).map(([key, content]) => (
                      <div key={key} className="border-l-4 border-primary pl-6">
                        <div className="whitespace-pre-line text-sm leading-relaxed">
                          {content}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Competitor Analysis</h1>
            <p className="text-muted-foreground mt-2">
              Analyze up to 3 competitor websites to gain valuable insights
            </p>
          </div>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Enter Competitor URLs</CardTitle>
              <p className="text-sm text-muted-foreground">
                Add 1-3 competitor website URLs to analyze their strategies, features, and positioning
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {urls.map((url, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium">
                    Competitor {index + 1} {index === 0 && <span className="text-red-500">*</span>}
                  </label>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    className="w-full"
                  />
                </div>
              ))}

              {isAnalyzing && (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Analyzing competitor websites...</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-xs text-muted-foreground">
                    This may take a few moments while we gather and analyze data
                  </p>
                </div>
              )}

              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || urls.every(url => url.trim() === '')}
                className="w-full mt-6"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analyze Competitors
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
