import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = 8081;

app.use(bodyParser.json());

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

async function analyzeWithAnthropic(competitorData, retries = 3, delay = 1000) {
  const competitorContent = competitorData
    .map(
      (competitor) => `
Competitor URL: ${competitor.url}
Website Content (Markdown):
${competitor.markdown}
---`
    )
    .join('\n');

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-7-sonnet-latest',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: `Please perform a comprehensive competitor analysis based on the following website content. Your response must be a single, consolidated report in well-structured Markdown format.

**Report Structure:**

1.  **Executive Summary**: Start with a brief overview comparing and contrasting the competitors.
2.  **Comparative Analysis**: Use level-2 headings (##) for each of the following sections.

    -   **Product Features**: Present a detailed comparison of features. Use a Markdown table for clarity.
    -   **Pricing Models**: Analyze and contrast the pricing strategies.
    -   **USPs & Positioning**: Use bullet points to list the unique selling propositions (USPs) and describe the market positioning for each competitor.
    -   **SEO Insights**: Compare keywords, meta content, and other SEO strategies.
    -   **Tech Stack**: Discuss any discernible differences in technology.
    -   **Trust Signals**: Evaluate social proof, testimonials, and certifications. Use bullet points.

3.  **Strategic Recommendations**: Provide actionable recommendations for a company looking to compete in this market.
4.  **Conclusion**: End with a concluding summary of the competitive landscape.

Make sure to use proper Markdown for headings, bold text, bullet points (\`-\` or \`*\`), and tables to ensure the report is highly readable and professionally formatted.

Here is the competitor data:
${competitorContent}`,
          },
        ],
      }),
    });
 
    if (!response.ok) {
      const errorBody = await response.json();
      if (errorBody.type === 'error' && errorBody.error.type === 'overloaded_error' && retries > 0) {
        console.warn(`Anthropic API overloaded. Retrying in ${delay}ms... (${retries} retries left)`);
        await new Promise(res => setTimeout(res, delay));
        return analyzeWithAnthropic(competitorData, retries - 1, delay * 2);
      }
      console.error('Anthropic API error:', errorBody);
      return { success: false, error: `Anthropic error: ${errorBody.error.message || response.statusText}` };
    }
 
    const json = await response.json();
    return { success: true, analysis: json.content[0].text };
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    return { success: false, error: error.message || 'Unknown error calling Anthropic API' };
  }
}

async function scrapeWithFirecrawl(url) {
  try {
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({ url, onlyMainContent: true }),
    });

    if (!response.ok) {
      return { url, success: false, error: `Firecrawl error: ${response.statusText}` };
    }

    const json = await response.json();
    if (!json.success) {
      return { url, success: false, error: json.error || 'Unknown error from Firecrawl' };
    }

    return {
      url,
      success: true,
      data: { markdown: json.data.markdown, metadata: json.data.metadata },
    };
  } catch (error) {
    return { url, success: false, error: error.message || 'Unknown error' };
  }
}

app.post('/api/analyze', async (req, res) => {
  const { urls } = req.body;

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ success: false, error: 'At least one URL is required' });
  }
  if (urls.length > 3) {
    return res.status(400).json({ success: false, error: 'Maximum 3 URLs allowed' });
  }

  try {
    const scrapeResults = await Promise.all(urls.map(scrapeWithFirecrawl));

    const successfulScrapes = scrapeResults.filter((r) => r.success);
    const failedScrapes = scrapeResults.filter((r) => !r.success);

    if (successfulScrapes.length === 0) {
      return res.status(400).json({ success: false, error: 'Failed to scrape all provided URLs.', results: failedScrapes });
    }

    const competitorData = successfulScrapes.map((result) => ({
      url: result.url,
      markdown: result.data.markdown,
    }));

    const analysisResult = await analyzeWithAnthropic(competitorData);

    if (analysisResult.success) {
      res.status(200).json({ success: true, analysis: analysisResult.analysis, failedScrapes });
    } else {
      res.status(500).json({ success: false, error: analysisResult.error, failedScrapes });
    }
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
}); 