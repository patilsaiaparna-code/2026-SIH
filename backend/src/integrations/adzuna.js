const axios = require('axios');
const env = require('../config/env');
const cache = require('../utils/cache');
const seedData = require('../../prisma/seed');

async function fetchLiveJobs(query = 'Data Scientist', location = 'India') {
  const cacheKey = `jobs_${query}_${location}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  // 1. Try Adzuna API if credentials are configured
  if (env.adzunaAppId && env.adzunaAppKey) {
    try {
      const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/in/search/1`, {
        params: {
          app_id: env.adzunaAppId,
          app_key: env.adzunaAppKey,
          what: query,
          where: location,
          results_per_page: 8
        },
        timeout: 5000
      });

      if (response.data && response.data.results && response.data.results.length > 0) {
        const jobs = response.data.results.map((j, idx) => ({
          id: `adzuna-${j.id || idx}`,
          title: j.title.replace(/<\/?[^>]+(>|$)/g, ""),
          company: j.company?.display_name || "Tech Enterprise",
          location: j.location?.display_name || location,
          isRemote: j.title.toLowerCase().includes('remote'),
          salary: j.salary_min ? `₹${Math.round(j.salary_min / 100000)} - ₹${Math.round(j.salary_max / 100000)} LPA` : "Market Standard",
          requiredSkills: [query, "Python", "SQL", "Git"],
          eligibility: "Engineering Graduates",
          applyUrl: j.redirect_url || "#",
          source: "Adzuna Jobs Portal",
          postedDate: j.created || new Date().toISOString()
        }));
        cache.set(cacheKey, jobs, 1800);
        return jobs;
      }
    } catch (e) {
      console.warn("Adzuna API call skipped/failed, trying Arbeitnow fallback:", e.message);
    }
  }

  // 2. Try Public Arbeitnow API fallback
  try {
    const response = await axios.get('https://www.arbeitnow.com/api/job-board-api', { timeout: 4000 });
    if (response.data && response.data.data && response.data.data.length > 0) {
      const filtered = response.data.data.filter(j => 
        j.title.toLowerCase().includes(query.toLowerCase()) || 
        j.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
      );
      const targetJobs = filtered.length > 0 ? filtered : response.data.data;
      
      const jobs = targetJobs.slice(0, 8).map((j, idx) => ({
        id: `arbeitnow-${idx}`,
        title: j.title,
        company: j.company_name,
        location: j.location || "Remote / Global",
        isRemote: j.remote || true,
        salary: "Competitive Tech Salary",
        requiredSkills: j.tags?.length > 0 ? j.tags.slice(0, 4) : [query, "Problem Solving"],
        eligibility: "Fresh Engineering Graduates",
        applyUrl: j.url || "https://arbeitnow.com",
        source: "Arbeitnow Global Portal",
        postedDate: new Date().toISOString()
      }));

      cache.set(cacheKey, jobs, 1800);
      return jobs;
    }
  } catch (e) {
    console.warn("Arbeitnow API fallback warning, using seed jobs store:", e.message);
  }

  // 3. Fallback to curated seed store
  const matchedSeedJobs = seedData.jobs.filter(j => 
    j.title.toLowerCase().includes(query.toLowerCase()) ||
    j.requiredSkills.some(s => s.toLowerCase().includes(query.toLowerCase()))
  );
  const result = matchedSeedJobs.length > 0 ? matchedSeedJobs : seedData.jobs;
  cache.set(cacheKey, result, 3600);
  return result;
}

module.exports = { fetchLiveJobs };
