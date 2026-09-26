import { api } from '../services/api.js';
import { stateManager } from '../services/state.js';
import { fallbackOpportunities } from '../data/opportunities.js';

export async function renderOpportunitiesView(activeTab = 'internships') {
  try {
    const profile = stateManager ? stateManager.getProfile() : {};
    const oppRes = await api.getOpportunities({ branch: profile.branch });
    const data = (oppRes && (oppRes.internships || oppRes.jobs)) ? oppRes : fallbackOpportunities;

    const internshipsList = (data.internships && data.internships.length > 0) ? data.internships : fallbackOpportunities.internships;
    const jobsList = (data.jobs && data.jobs.length > 0) ? data.jobs : fallbackOpportunities.jobs;

    return `
      <div class="view-header">
        <h1 class="view-title">Verified Internships & Entry Jobs</h1>
        <p class="view-subtitle">Direct links to official company portals. Zero spam, zero fake application forms.</p>
      </div>

      <!-- Segmented Tabs & Filters Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
        <div class="filter-pills" style="margin-bottom: 0;">
          <button class="filter-pill tab-btn ${activeTab === 'internships' ? 'active' : ''}" data-tab="internships">💼 INTERNSHIPS (${internshipsList.length})</button>
          <button class="filter-pill tab-btn ${activeTab === 'jobs' ? 'active' : ''}" data-tab="jobs">🎯 ENTRY JOBS (${jobsList.length})</button>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <label style="font-size: 0.875rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
            <input type="checkbox" id="remote-only-checkbox"> Remote Only 🌐
          </label>
          <input type="text" id="opp-search-input" class="form-control" placeholder="Filter by skill or company..." style="width: 220px; padding: 0.4rem 0.75rem;">
        </div>
      </div>

      <!-- Tab Content: INTERNSHIPS -->
      <div id="internships-tab-content" class="${activeTab === 'internships' ? '' : 'hidden'}">
        <div class="grid-2">
          ${internshipsList.map(item => {
            const reqSkills = item.requiredSkills || item.requirements || [];
            return `
              <div class="card card-opps">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                  <span class="badge" style="background-color: var(--green-bg); color: var(--green-primary);">${item.company}</span>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${item.location} ${item.isRemote ? '• Remote 🌐' : ''}</span>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem;">${item.title}</h3>
                <span style="font-size: 0.875rem; font-weight: 700; color: var(--green-primary); display: block; margin-bottom: 0.75rem;">Stipend: ${item.stipend}</span>
                
                <div style="margin-bottom: 0.75rem;">
                  <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Required Skills:</span>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
                    ${reqSkills.map(s => `<span class="badge" style="background: var(--bg-color); border: 1px solid var(--surface-border); color: var(--text-secondary);">${s}</span>`).join('')}
                  </div>
                </div>

                <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 1rem;">Eligibility: ${item.eligibility || 'Engineering Students'}</span>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--surface-border); padding-top: 0.75rem;">
                  <span style="font-size: 0.75rem; color: var(--text-muted);">Source: ${item.source || 'Verified Portal'}</span>
                  <button class="btn-primary apply-modal-btn" data-title="${item.title}" data-company="${item.company}" data-url="${item.applyUrl || 'https://linkedin.com'}" style="background-color: var(--green-primary); font-size: 0.8125rem; padding: 0.4rem 0.875rem;">APPLY ON PORTAL ↗</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Tab Content: JOBS -->
      <div id="jobs-tab-content" class="${activeTab === 'jobs' ? '' : 'hidden'}">
        <div class="grid-2">
          ${jobsList.map(item => {
            const reqSkills = item.requiredSkills || item.requirements || [];
            return `
              <div class="card" style="border-top: 4px solid var(--amber-primary);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                  <span class="badge" style="background-color: #FEF3C7; color: var(--amber-primary);">${item.company}</span>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${item.location}</span>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem;">${item.title}</h3>
                <span style="font-size: 0.875rem; font-weight: 700; color: var(--amber-primary); display: block; margin-bottom: 0.75rem;">Salary: ${item.salary}</span>
                
                <div style="margin-bottom: 0.75rem;">
                  <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Required Skills:</span>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
                    ${reqSkills.map(s => `<span class="badge" style="background: var(--bg-color); border: 1px solid var(--surface-border); color: var(--text-secondary);">${s}</span>`).join('')}
                  </div>
                </div>

                <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 1rem;">Eligibility: ${item.eligibility || 'Fresh Graduates'}</span>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--surface-border); padding-top: 0.75rem;">
                  <span style="font-size: 0.75rem; color: var(--text-muted);">Source: ${item.source || 'Verified Portal'}</span>
                  <button class="btn-primary apply-modal-btn" data-title="${item.title}" data-company="${item.company}" data-url="${item.applyUrl || 'https://linkedin.com'}" style="background-color: var(--amber-primary); font-size: 0.8125rem; padding: 0.4rem 0.875rem;">APPLY ON PORTAL ↗</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  } catch (err) {
    console.warn("Opportunities rendering error, showing fallback opportunities:", err);
    const data = fallbackOpportunities;
    return `
      <div class="view-header">
        <h1 class="view-title">Verified Internships & Entry Jobs</h1>
        <p class="view-subtitle">Direct links to official company portals. Zero spam, zero fake application forms.</p>
      </div>
      <div class="grid-2">
        ${data.internships.map(item => `
          <div class="card card-opps">
            <h3 style="font-size: 1.25rem; font-weight: 800;">${item.title}</h3>
            <span style="font-size: 0.875rem; font-weight: 700; color: var(--green-primary); display: block; margin: 0.5rem 0;">${item.company} • ${item.stipend}</span>
            <a href="${item.applyUrl}" target="_blank" rel="noopener" class="btn-primary" style="font-size: 0.8125rem; margin-top: 0.75rem;">APPLY ON PORTAL ↗</a>
          </div>
        `).join('')}
      </div>
    `;
  }
}
