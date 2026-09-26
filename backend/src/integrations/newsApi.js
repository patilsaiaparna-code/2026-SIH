const axios = require('axios');
const env = require('../config/env');
const cache = require('../utils/cache');

const fallbackNews = [
  {
    id: "news-1",
    title: "Tech Campus Placements 2026: High Demand for Python, SQL, and AI Engineers",
    source: "Economic Times Tech",
    sourceTag: "Economic Times",
    url: "https://economictimes.indiatimes.com/tech",
    publishedAt: "2026-03-10",
    snippet: "Major IT services and product firms report a 35% increase in hiring roles emphasizing core Python, SQL database expertise, and cloud fundamentals.",
    category: "Placement Bulletins"
  },
  {
    id: "news-2",
    title: "Microsoft Announces 2026 University Graduate & Intern Hiring Drives",
    source: "Microsoft Careers",
    sourceTag: "Microsoft Careers",
    url: "https://careers.microsoft.com",
    publishedAt: "2026-03-08",
    snippet: "Microsoft has opened direct applications for software engineering and data analyst intern roles for 2nd and 3rd-year engineering students.",
    category: "Placement Bulletins"
  },
  {
    id: "news-3",
    title: "TCS NextStep Hiring 2026: NQT Registration Guidelines for Engineering Freshers",
    source: "TCS News",
    sourceTag: "TCS",
    url: "https://tcs.com/careers",
    publishedAt: "2026-03-05",
    snippet: "TCS opens national qualifier tests emphasizing foundational problem solving, data structures, and database management.",
    category: "Placement Bulletins"
  },
  {
    id: "news-4",
    title: "Industry Skill Trends: Why Pure Hype Skills Without Fundamentals Fail in Interviews",
    source: "LinkedIn News Tech",
    sourceTag: "LinkedIn",
    url: "https://linkedin.com",
    publishedAt: "2026-03-01",
    snippet: "Hiring managers warn fresh graduates against superficial AI certificates, advising a focus on core engineering fundamentals first.",
    category: "Industry Trends"
  }
];

async function fetchPlacementNews(query = 'engineering hiring placement tech') {
  const cacheKey = `news_${query}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  if (env.newsApiKey) {
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: query,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 8,
          apiKey: env.newsApiKey
        },
        timeout: 5000
      });

      if (response.data && response.data.articles && response.data.articles.length > 0) {
        const articles = response.data.articles.map((art, idx) => ({
          id: `news-live-${idx}`,
          title: art.title,
          source: art.source?.name || 'Tech News',
          sourceTag: art.source?.name || 'Verified Source',
          url: art.url,
          publishedAt: art.publishedAt ? art.publishedAt.split('T')[0] : '2026-03-01',
          snippet: art.description || art.title,
          category: 'Placement Bulletins'
        }));
        cache.set(cacheKey, articles, 1800);
        return articles;
      }
    } catch (e) {
      console.warn('NewsAPI fetch warning, using fallback placement news:', e.message);
    }
  }

  cache.set(cacheKey, fallbackNews, 3600);
  return fallbackNews;
}

module.exports = { fetchPlacementNews };
