import { stateManager } from '../services/state.js';
import { api } from '../services/api.js';
import { fallbackTrends } from '../data/trends.js';

export async function renderTrendCheckerView() {
  const profile = stateManager.getProfile();
  
  // Fetch available trends list from backend API
  const trendsRes = await api.getTrends();
  const trendsList = (trendsRes && trendsRes.trends) ? trendsRes.trends : fallbackTrends;

  const defaultTopic = trendsList[0]?.topic || "Generative AI";
  let selectedTopic = defaultTopic;

  // Fetch trend evaluation from API or fallback
  let trendData = null;
  const apiRes = await api.getTrendEvaluation(selectedTopic, profile.targetRole);
  if (apiRes && apiRes.trend) {
    trendData = apiRes.trend;
  } else {
    trendData = fallbackTrends.find(t => t.topic === selectedTopic) || fallbackTrends[0];
  }

  return `
    <div class="view-header">
      <span class="hero-label">MARKET REALITY CHECKER</span>
      <h1 class="view-title">TREND OR TRULY USEFUL?</h1>
      <p class="view-subtitle">Evaluate social media tech hype against real entry-level engineering hiring requirements.</p>
    </div>

    <!-- Topic Selector Pills -->
    <div class="card" style="margin-bottom: 2rem; padding: 1.25rem;">
      <label style="font-size: 0.8125rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 0.75rem;">SELECT A TECH TREND TO EVALUATE</label>
      <div class="filter-pills" style="margin-bottom: 0;">
        ${trendsList.map((t, idx) => `
          <button class="filter-pill trend-topic-btn ${idx === 0 ? 'active' : ''}" data-topic="${t.topic}">${t.topic} ${t.icon || '🔥'}</button>
        `).join('')}
      </div>
    </div>

    <!-- Trend Evaluation Container -->
    <div id="trend-evaluation-container">
      ${renderTrendMeters(trendData, profile.targetRole)}
    </div>
  `;
}

export function renderTrendMeters(trendData, targetRole = 'Data Scientist') {
  return `
    <div class="card card-news" style="margin-bottom: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800;">🔥 ${trendData.topic || trendData.name}</h2>
          <span style="font-size: 0.875rem; color: var(--text-muted);">Mapped against your goal: <strong>${targetRole}</strong></span>
        </div>
        <span class="badge badge-growing" style="font-size: 0.875rem; padding: 0.35rem 0.85rem;">${trendData.trendLevel}</span>
      </div>

      <!-- Comparison Meters Grid -->
      <div style="background-color: var(--bg-color); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.875rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 1rem;">VISUAL MARKET RELEVANCE METERS</h4>
        
        <div class="trend-meter">
          <span style="width: 180px; font-size: 0.875rem; font-weight: 600;">Social Media Hype</span>
          <div class="meter-bar"><div class="meter-fill fill-high"></div></div>
          <span style="font-size: 0.8125rem; font-weight: 700; width: 100px;">${trendData.trendLevel}</span>
        </div>

        <div class="trend-meter">
          <span style="width: 180px; font-size: 0.875rem; font-weight: 600;">Entry Job Relevance</span>
          <div class="meter-bar"><div class="meter-fill fill-medium"></div></div>
          <span style="font-size: 0.8125rem; font-weight: 700; width: 100px;">${trendData.entryJobRelevance || 'MODERATE'}</span>
        </div>

        <div class="trend-meter">
          <span style="width: 180px; font-size: 0.875rem; font-weight: 600;">Internship Relevance</span>
          <div class="meter-bar"><div class="meter-fill fill-low"></div></div>
          <span style="font-size: 0.8125rem; font-weight: 700; width: 100px;">${trendData.internshipRelevance || 'EMERGING'}</span>
        </div>

        <div class="trend-meter">
          <span style="width: 180px; font-size: 0.875rem; font-weight: 600;">Relevance to Goal</span>
          <div class="meter-bar"><div class="meter-fill fill-high"></div></div>
          <span style="font-size: 0.8125rem; font-weight: 700; width: 100px;">${trendData.relevanceToGoal || 'HIGH'}</span>
        </div>
      </div>

      <!-- YOUR TAKEAWAY -->
      <div style="background: linear-gradient(135deg, var(--blue-bg) 0%, #DBEAFE 100%); border: 1px solid var(--blue-border); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.8125rem; font-weight: 800; color: var(--blue-primary); text-transform: uppercase;">💡 YOUR TAKEAWAY</h4>
        <p style="font-size: 1.0625rem; font-weight: 700; color: var(--text-primary); margin-top: 0.35rem;">${trendData.takeaway}</p>
      </div>

      <!-- WHY? Bullet Breakdown -->
      <div>
        <h4 style="font-size: 0.9375rem; font-weight: 800; margin-bottom: 0.75rem;">WHY? MARKET REALITY BREAKDOWN</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
          ${(trendData.why || []).map(bullet => `
            <li style="font-size: 0.875rem; color: var(--text-secondary); padding-left: 1.25rem; position: relative;">
              <span style="position: absolute; left: 0; color: var(--blue-primary);">•</span> ${bullet}
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}
