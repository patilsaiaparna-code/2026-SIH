const API_BASE_URL = (function() {
  if (typeof window === 'undefined' || !window.location || !window.location.origin) return 'http://localhost:5000/api';
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') return 'http://localhost:5000/api';
  if (host.includes('github.io')) {
    return 'https://2026-sih.vercel.app/api';
  }
  return `${window.location.origin}/api`;
})();


async function fetchApi(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`Backend API (${endpoint}) unreachable or timed out. Falling back to local data engine.`, err.message);
    return null;
  }
}

export const api = {
  // Health Status
  async getHealth() {
    return await fetchApi('/health');
  },

  // Student Profile Persistence
  async saveStudentProfile(studentProfile) {
    return await fetchApi('/students', {
      method: 'POST',
      body: JSON.stringify(studentProfile)
    });
  },

  async getStudentProfile(id) {
    return await fetchApi(`/students/${encodeURIComponent(id)}`);
  },

  // Career Roles Catalog
  async getCareerRoles() {
    return await fetchApi('/career-roles');
  },

  // Recommendations
  async getRecommendations(studentProfile) {
    const res = await fetchApi('/recommendations', {
      method: 'POST',
      body: JSON.stringify(studentProfile)
    });
    return res;
  },

  // News & Skills
  async getNews(q = '') {
    return await fetchApi(`/news?q=${encodeURIComponent(q)}`);
  },

  async getSkills() {
    return await fetchApi('/skills');
  },

  async getSkillPath(skillName) {
    return await fetchApi(`/skills/${encodeURIComponent(skillName)}/path`);
  },

  // Courses
  async getCourses(params = {}) {
    const queryStr = new URLSearchParams(params).toString();
    return await fetchApi(`/courses?${queryStr}`);
  },

  async getEducationalVideos(query = 'Python') {
    return await fetchApi(`/courses/videos?q=${encodeURIComponent(query)}`);
  },

  // Opportunities
  async getOpportunities(params = {}) {
    const queryStr = new URLSearchParams(params).toString();
    return await fetchApi(`/opportunities?${queryStr}`);
  },

  async getJobs(query = '', location = '') {
    return await fetchApi(`/jobs?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
  },

  async getJobAnalysis(role = '') {
    return await fetchApi(`/jobs/analysis?role=${encodeURIComponent(role)}`);
  },

  // Smart Tools
  async getBackwardPlan(targetRole, skills) {
    return await fetchApi('/planner', {
      method: 'POST',
      body: JSON.stringify({ targetRole, skills })
    });
  },

  async getTrends() {
    return await fetchApi('/trends');
  },

  async getTrendEvaluation(topic, role) {
    return await fetchApi(`/trends/${encodeURIComponent(topic)}?role=${encodeURIComponent(role || '')}`);
  },

  async getLearningPlan(days, hoursPerWeek, goal) {
    return await fetchApi('/learning-plan', {
      method: 'POST',
      body: JSON.stringify({ days, hoursPerWeek, goal })
    });
  },

  // Global Search
  async globalSearch(q) {
    return await fetchApi(`/search?q=${encodeURIComponent(q)}`);
  }
};
