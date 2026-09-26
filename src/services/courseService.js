const repository = require('../db/repository');
const { fetchYoutubeVideos } = require('../integrations/youtube');

const courseService = {
  async getCourses(filters = {}) {
    return await repository.getCourses(filters);
  },

  async getEducationalVideos(query) {
    return await fetchYoutubeVideos(query || 'Python Programming Tutorial');
  }
};

module.exports = courseService;
