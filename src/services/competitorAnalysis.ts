
// Frontend service for competitor analysis
// Handles API calls to the backend

export interface CompetitorAnalysisData {
  productFeatures: string;
  pricingModels: string;
  uniqueSellingProps: string;
  contentStrategies: string;
  seoInsights: string;
  techStack: string;
  trustSignals: string;
}

export class CompetitorAnalysisService {
  static async analyzeCompetitors(urls: string[]): Promise<CompetitorAnalysisData> {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze competitors');
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Analysis failed');
      }

      return result.data;
    } catch (error) {
      console.error('Competitor analysis error:', error);
      throw error;
    }
  }

  static validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static formatUrl(url: string): string {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  }
}
