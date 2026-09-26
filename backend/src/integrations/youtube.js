const axios = require('axios');
const env = require('../config/env');
const cache = require('../utils/cache');

const fallbackVideos = [
  {
    id: "yt-1",
    title: "Python for Beginners - Full Course (6 Hours)",
    channelTitle: "freeCodeCamp.org",
    videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    thumbnailUrl: "https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg",
    description: "Learn Python programming fundamentals step by step with practical exercises."
  },
  {
    id: "yt-2",
    title: "SQL Tutorial - Full Database Course for Beginners",
    channelTitle: "freeCodeCamp.org",
    videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
    thumbnailUrl: "https://img.youtube.com/vi/HXV3zeQKqGY/hqdefault.jpg",
    description: "Master relational databases, SQL queries, JOINs, and indexing."
  },
  {
    id: "yt-3",
    title: "Data Structures and Algorithms for Beginners",
    channelTitle: "Programming with Mosh",
    videoUrl: "https://www.youtube.com/watch?v=BBpAmxU_NQo",
    thumbnailUrl: "https://img.youtube.com/vi/BBpAmxU_NQo/hqdefault.jpg",
    description: "Core algorithms, arrays, linked lists, and time complexity analysis."
  }
];

async function fetchYoutubeVideos(searchQuery = 'Python Programming Tutorial') {
  const cacheKey = `yt_${searchQuery}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  if (env.youtubeApiKey) {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: `${searchQuery} tutorial free course`,
          type: 'video',
          maxResults: 6,
          key: env.youtubeApiKey
        },
        timeout: 5000
      });

      if (response.data && response.data.items && response.data.items.length > 0) {
        const videos = response.data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
          description: item.snippet.description
        }));
        cache.set(cacheKey, videos, 3600);
        return videos;
      }
    } catch (e) {
      console.warn('YouTube API fetch warning, using fallback video resources:', e.message);
    }
  }

  cache.set(cacheKey, fallbackVideos, 3600);
  return fallbackVideos;
}

module.exports = { fetchYoutubeVideos };
