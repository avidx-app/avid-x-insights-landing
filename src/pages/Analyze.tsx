
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Globe, Loader2, BarChart3, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface ScrapeResult {
  url: string;
  success: boolean;
  data?: {
    markdown: string;
    metadata: Record<string, unknown>;
  };
  analysis?: {
    success: boolean;
    analysis?: string;
    error?: string;
  };
  error?: string;
}

interface AnalysisData {
  urls: string[];
  analysis: string;
  failedScrapes: ScrapeResult[];
}

const Analyze = () => {
  const [urls, setUrls] = useState<string[]>(['', '', '']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 5, 90));
    }, 500);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: validUrls }),
      });

      clearInterval(progressInterval);
      setProgress(100);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'An unknown error occurred');
      }
      
      setAnalysisData({
        urls: validUrls,
        analysis: data.analysis,
        failedScrapes: data.failedScrapes || [],
      });

    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsAnalyzing(false);
      clearInterval(progressInterval);
    }
  };

  const resetAnalysis = () => {
    setAnalysisData(null);
    setUrls(['', '', '']);
    setProgress(0);
    setError(null);
  };

  if (analysisData) {
    const successfulUrls = analysisData.urls.filter(
      (url) => !analysisData.failedScrapes.some((failed) => failed.url === url)
    );

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
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analyzed Websites</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {successfulUrls.map((url, index) => (
                    <div key={`success-${index}`} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm truncate">{url}</span>
                    </div>
                  ))}
                  {analysisData.failedScrapes.map((result, index) => (
                     <div key={`fail-${index}`} className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-sm truncate text-red-500">{result.url}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Comparative Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysisData.analysis}</ReactMarkdown>
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

              {error && (
                <Alert variant="destructive" className="mt-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Analysis Failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isAnalyzing && (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Analyzing competitor websites...</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-xs text-muted-foreground">
                    This may take a few moments while we gather and analyze data.
                  </p>
                </div>
              )}

              <Button
                onClick={handleAnalyze}
                type="button"
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
