const { fetchPlacementNews } = require('../integrations/newsApi');

const newsService = {
  async getNews(query = 'engineering hiring placement tech') {
    return await fetchPlacementNews(query);
  }
};

module.exports = newsService;
