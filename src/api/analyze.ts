
// Placeholder for future API integration
// This will handle the backend logic for competitor analysis

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

interface AnalysisRequest {
  urls: string[];
}

interface FirecrawlResult {
  url: string;
  success: boolean;
  data?: {
    markdown: string;
    html: string;
    metadata: Record<string, any>;
  };
  error?: string;
}

interface AnalysisResponse {
  success: boolean;
  results?: FirecrawlResult[];
  error?: string;
}

async function scrapeWithFirecrawl(url: string): Promise<FirecrawlResult> {
  try {
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        url,
        formats: ['markdown', 'html'],
      }),
    });

    if (!response.ok) {
      return {
        url,
        success: false,
        error: `Firecrawl error: ${response.statusText}`,
      };
    }

    const json = await response.json();
    if (!json.success) {
      return {
        url,
        success: false,
        error: json.error || 'Unknown error from Firecrawl',
      };
    }

    return {
      url,
      success: true,
      data: {
        markdown: json.data.markdown,
        html: json.data.html,
        metadata: json.data.metadata,
      },
    };
  } catch (error: any) {
    return {
      url,
      success: false,
      error: error.message || 'Unknown error',
    };
  }
}

export default async function handler(
  req: any,
  res: any
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { urls }: AnalysisRequest = req.body;

    if (!urls || urls.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'At least one URL is required' 
      });
    }

    if (urls.length > 3) {
      return res.status(400).json({ 
        success: false, 
        error: 'Maximum 3 URLs allowed' 
      });
    }

    // Scrape each URL in parallel
    const results = await Promise.all(urls.map(scrapeWithFirecrawl));

    res.status(200).json({
      success: true,
      results,
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
