import { api } from '../services/api.js';
import { stateManager } from '../services/state.js';
import { fallbackNewsArticles } from '../data/news.js';
import { fallbackSkills } from '../data/skills.js';

export async function renderNewsSkillsView(activeTab = 'news') {
  const profile = stateManager ? stateManager.getProfile() : {};
  const query = profile.targetRole || profile.branch || 'engineering hiring placement';
  const newsRes = await api.getNews(query);
  const newsList = (newsRes && newsRes.news && newsRes.news.length > 0) ? newsRes.news : fallbackNewsArticles;

  const skillsRes = await api.getSkills();
  const skillsList = (skillsRes && skillsRes.skills) ? skillsRes.skills : fallbackSkills;

  return `
    <div class="view-header">
      <h1 class="view-title">Industry News & Skills in Demand</h1>
      <p class="view-subtitle">Stay updated with verified campus placement bulletins and essential career skill trajectories.</p>
    </div>

    <!-- Segmented Tabs -->
    <div class="filter-pills" style="margin-bottom: 2rem;">
      <button class="filter-pill tab-btn ${activeTab === 'news' ? 'active' : ''}" data-tab="news">📰 PLACEMENT NEWS (${newsList.length})</button>
      <button class="filter-pill tab-btn ${activeTab === 'skills' ? 'active' : ''}" data-tab="skills">⚡ SKILLS IN DEMAND (${skillsList.length})</button>
    </div>

    <!-- Tab Content: NEWS -->
    <div id="news-tab-content" class="${activeTab === 'news' ? '' : 'hidden'}">
      <div class="grid-2">
        ${newsList.map(item => `
          <div class="card card-news">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
              <span class="badge" style="background-color: var(--blue-bg); color: var(--blue-primary);">${item.sourceTag || item.source}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${item.publishedAt}</span>
            </div>
            <h3 style="font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">${item.title}</h3>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem;">${item.snippet}</p>
            <div style="text-align: right;">
              <a href="${item.url}" target="_blank" rel="noopener" class="btn-secondary" style="font-size: 0.8125rem; padding: 0.4rem 0.75rem;">READ ORIGINAL SOURCE ↗</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Tab Content: SKILLS IN DEMAND -->
    <div id="skills-tab-content" class="${activeTab === 'skills' ? '' : 'hidden'}">
      <div class="grid-3">
        ${skillsList.map(skill => {
          let badgeClass = "badge-high";
          if (skill.demandBadge === "GROWING") badgeClass = "badge-growing";
          if (skill.demandBadge === "STEADY") badgeClass = "badge-steady";

          return `
            <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span class="badge ${badgeClass}">${skill.demandBadge || skill.importance || 'HIGH DEMAND'}</span>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${skill.category || 'Tech'}</span>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">${skill.name}</h3>
                <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem;">${skill.description}</p>
              </div>
              <button class="btn-primary explore-skill-btn" data-skill="${skill.name}" style="font-size: 0.8125rem; padding: 0.5rem 0.875rem; justify-content: center;">EXPLORE SKILL →</button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
