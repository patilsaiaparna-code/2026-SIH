import { renderHeader } from './components/header.js';
import { renderHomeView } from './components/homeView.js';
import { renderNewsSkillsView } from './components/newsSkillsView.js';
import { renderLearnView, renderCourseCardsList } from './components/learnView.js';
import { renderOpportunitiesView } from './components/opportunitiesView.js';
import { renderBackwardPlannerView } from './components/backwardPlannerView.js';
import { renderTrendCheckerView, renderTrendMeters } from './components/trendCheckerView.js';
import { renderXDaysView, renderTimetableSchedule } from './components/xDaysView.js';

import { stateManager } from './services/state.js';
import { api } from './services/api.js';
import { filterCourses } from './services/searchFilter.js';
import { calculateLocalBackwardPlan, calculateLocalLearningPlan } from './services/plannerEngine.js';
import { fallbackSkills } from './data/skills.js';
import { fallbackCourses } from './data/courses.js';
import { fallbackOpportunities } from './data/opportunities.js';
import { fallbackTrends } from './data/trends.js';

class AppRouter {
  constructor() {
    this.headerContainer = document.getElementById('header-container');
    this.appContent = document.getElementById('app-content');
    this.searchModal = document.getElementById('search-modal');
    this.detailModal = document.getElementById('detail-modal');
    this.detailModalBody = document.getElementById('detail-modal-body');

    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('keydown', (e) => this.handleGlobalKeydown(e));
    
    // Subscribe to state updates
    stateManager.subscribe(() => {
      if (this.getCurrentRoute() === 'home') {
        this.renderRoute('home');
      }
    });

    this.setupGlobalEvents();
    this.handleRoute();
  }

  getCurrentRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const validRoutes = ['home', 'news-skills', 'learn', 'opportunities', 'planner', 'trend-checker', 'x-days'];
    return validRoutes.includes(hash) ? hash : 'home';
  }

  async handleRoute() {
    const route = this.getCurrentRoute();
    this.headerContainer.innerHTML = renderHeader(route);
    await this.renderRoute(route);
    window.scrollTo(0, 0);
  }

  async renderRoute(route) {
    this.appContent.innerHTML = `<div style="text-align: center; padding: 4rem; color: var(--text-muted);">Loading StudentHub...</div>`;
    
    try {
      switch (route) {
        case 'home':
          this.appContent.innerHTML = await renderHomeView();
          this.setupHomeEvents();
          break;
        case 'news-skills':
          this.appContent.innerHTML = await renderNewsSkillsView();
          this.setupNewsSkillsEvents();
          break;
        case 'learn':
          this.appContent.innerHTML = await renderLearnView();
          this.setupLearnEvents();
          break;
        case 'opportunities':
          this.appContent.innerHTML = await renderOpportunitiesView();
          this.setupOpportunitiesEvents();
          break;
        case 'planner':
          this.appContent.innerHTML = await renderBackwardPlannerView();
          this.setupPlannerEvents();
          break;
        case 'trend-checker':
          this.appContent.innerHTML = await renderTrendCheckerView();
          this.setupTrendEvents();
          break;
        case 'x-days':
          this.appContent.innerHTML = await renderXDaysView();
          this.setupXDaysEvents();
          break;
        default:
          this.appContent.innerHTML = await renderHomeView();
          this.setupHomeEvents();
      }
    } catch (err) {
      console.warn(`Error rendering route '${route}':`, err);
      this.appContent.innerHTML = `
        <div style="text-align: center; padding: 4rem; color: var(--text-secondary);">
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">Something went wrong while loading this section.</h2>
          <p style="font-size: 0.9375rem; color: var(--text-muted); margin-bottom: 1.5rem;">Please check your connection or retry loading the view.</p>
          <button class="btn-primary" onclick="window.appRouter.handleRoute()">TRY AGAIN 🔄</button>
        </div>
      `;
    }
  }

  setupGlobalEvents() {
    // Search modal triggers
    document.addEventListener('click', (e) => {
      if (e.target.closest('#header-search-btn')) {
        this.openSearchModal();
      }
      if (e.target.closest('#close-search-btn') || e.target === this.searchModal) {
        this.closeSearchModal();
      }
      if (e.target.closest('#close-detail-btn') || e.target === this.detailModal) {
        this.closeDetailModal();
      }
      if (e.target.closest('#hamburger-toggle')) {
        const drawer = document.getElementById('mobile-drawer');
        if (drawer) drawer.classList.toggle('open');
      }
    });

    // Global Search Input Event
    const globalSearchInput = document.getElementById('global-search-input');
    if (globalSearchInput) {
      globalSearchInput.addEventListener('input', (e) => this.handleGlobalSearch(e.target.value));
    }
  }

  handleGlobalKeydown(e) {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'SELECT') {
      e.preventDefault();
      this.openSearchModal();
    }
    if (e.key === 'Escape') {
      this.closeSearchModal();
      this.closeDetailModal();
    }
  }

  openSearchModal() {
    this.searchModal.classList.remove('hidden');
    this.searchModal.setAttribute('aria-hidden', 'false');
    const input = document.getElementById('global-search-input');
    if (input) setTimeout(() => input.focus(), 100);
  }

  closeSearchModal() {
    this.searchModal.classList.add('hidden');
    this.searchModal.setAttribute('aria-hidden', 'true');
  }

  openDetailModal(htmlContent) {
    this.detailModalBody.innerHTML = htmlContent;
    this.detailModal.classList.remove('hidden');
    this.detailModal.setAttribute('aria-hidden', 'false');
  }

  closeDetailModal() {
    this.detailModal.classList.add('hidden');
    this.detailModal.setAttribute('aria-hidden', 'true');
  }

  async handleGlobalSearch(query) {
    const resultsContainer = document.getElementById('search-results-container');
    if (!query.trim()) {
      resultsContainer.innerHTML = `<p class="search-placeholder-text">Type a keyword like <strong>Python</strong>, <strong>Data Analyst</strong>, or <strong>AWS</strong> to explore.</p>`;
      return;
    }

    const apiRes = await api.globalSearch(query);
    const results = (apiRes && apiRes.results) ? apiRes.results : { courses: [], skills: [], jobs: [], internships: [], news: [] };

    const hasAnyResults = (results.courses.length + results.skills.length + results.jobs.length + results.internships.length + results.news.length) > 0;

    if (!hasAnyResults) {
      resultsContainer.innerHTML = `<p class="search-placeholder-text">No matching resources found for "${query}". Try searching for <strong>Python</strong>, <strong>Kaggle</strong>, or <strong>Data Scientist</strong>.</p>`;
      return;
    }

    resultsContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem;">
        ${results.courses.slice(0, 2).map(c => `
          <div style="padding: 0.75rem; border: 1px solid var(--surface-border); border-radius: var(--radius-sm); font-size: 0.875rem;">
            <span class="badge" style="background: var(--lavender-bg); color: var(--lavender-primary);">COURSE</span>
            <strong>${c.title}</strong> (${c.platform})
          </div>
        `).join('')}

        ${results.skills.slice(0, 2).map(s => `
          <div style="padding: 0.75rem; border: 1px solid var(--surface-border); border-radius: var(--radius-sm); font-size: 0.875rem;">
            <span class="badge" style="background: var(--blue-bg); color: var(--blue-primary);">SKILL</span>
            <strong>${s.name}</strong> - ${s.description}
          </div>
        `).join('')}

        ${results.internships.slice(0, 2).map(i => `
          <div style="padding: 0.75rem; border: 1px solid var(--surface-border); border-radius: var(--radius-sm); font-size: 0.875rem;">
            <span class="badge" style="background: var(--green-bg); color: var(--green-primary);">INTERNSHIP</span>
            <strong>${i.title}</strong> at ${i.company} (${i.stipend})
          </div>
        `).join('')}

        ${results.jobs.slice(0, 2).map(j => `
          <div style="padding: 0.75rem; border: 1px solid var(--surface-border); border-radius: var(--radius-sm); font-size: 0.875rem;">
            <span class="badge" style="background: #FEF3C7; color: var(--amber-primary);">JOB</span>
            <strong>${j.title}</strong> at ${j.company} (${j.salary})
          </div>
        `).join('')}

        ${results.news.slice(0, 2).map(n => `
          <div style="padding: 0.75rem; border: 1px solid var(--surface-border); border-radius: var(--radius-sm); font-size: 0.875rem;">
            <span class="badge" style="background: var(--blue-bg); color: var(--blue-primary);">NEWS</span>
            <strong>${n.title}</strong>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* View Event Handlers */
  setupHomeEvents() {
    const form = document.getElementById('personalization-form');
    if (!form) return;

    // Filter skill pills dynamically
    const filterInput = document.getElementById('skill-filter-input');
    if (filterInput) {
      filterInput.addEventListener('input', () => {
        const query = filterInput.value.toLowerCase().trim();
        const pills = form.querySelectorAll('.skill-pill-toggle');
        pills.forEach(btn => {
          const text = (btn.dataset.skill || '').toLowerCase();
          btn.style.display = text.includes(query) ? 'inline-flex' : 'none';
        });
      });
    }

    // Toggle skill pills
    form.addEventListener('click', (e) => {
      const btn = e.target.closest('.skill-pill-toggle');
      if (btn) {
        btn.classList.toggle('selected');
        btn.textContent = `${btn.dataset.skill} ${btn.classList.contains('selected') ? '✓' : '+'}`;
      }
    });

    // Form submit
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const branch = document.getElementById('branch-select').value;
      const year = document.getElementById('year-select').value;
      const targetRole = document.getElementById('role-select').value;
      const availableHoursPerWeek = document.getElementById('hours-input').value;

      const selectedSkillBtns = form.querySelectorAll('.skill-pill-toggle.selected');
      const currentSkills = Array.from(selectedSkillBtns).map(b => b.dataset.skill);

      const profilePayload = { branch, year, targetRole, currentSkills, availableHoursPerWeek };
      
      // Save locally and persist to backend POST /api/students
      stateManager.saveProfile(profilePayload);
      await api.saveStudentProfile(profilePayload);
      this.renderRoute('home');
    });
  }

  setupNewsSkillsEvents() {
    // Tab Switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tab = btn.dataset.tab;
        document.getElementById('news-tab-content').classList.toggle('hidden', tab !== 'news');
        document.getElementById('skills-tab-content').classList.toggle('hidden', tab !== 'skills');
      });
    });

    // Skill Exploration Modal
    document.querySelectorAll('.explore-skill-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const skillName = btn.dataset.skill;
        const res = await api.getSkillPath(skillName);
        const skillObj = (res && res.skill) ? res.skill : fallbackSkills.find(s => s.name === skillName) || fallbackSkills[0];

        this.openDetailModal(`
          <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">⚡ SKILL EXPLORATION: ${skillObj.name}</h2>
          <span class="badge badge-high" style="margin-bottom: 1rem;">${skillObj.demandBadge || 'HIGH DEMAND'}</span>
          
          <div style="background-color: var(--bg-color); padding: 1.25rem; border-radius: var(--radius-md); margin: 1rem 0;">
            <h4 style="font-size: 0.8125rem; font-weight: 800; text-transform: uppercase; color: var(--blue-primary);">WHY IT MATTERS</h4>
            <p style="font-size: 0.9375rem; color: var(--text-primary); margin-top: 0.35rem;">${skillObj.whyItMatters || skillObj.description}</p>
          </div>

          <h4 style="font-size: 0.9375rem; font-weight: 800; margin-top: 1.25rem; margin-bottom: 0.5rem;">RELATED CAREER PATHS</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
            ${(skillObj.relatedCareers || ["Data Scientist", "Data Analyst", "SDE"]).map(c => `<span class="badge" style="background: var(--lavender-bg); color: var(--lavender-primary); font-size: 0.8125rem;">${c}</span>`).join('')}
          </div>

          <div style="text-align: right; margin-top: 1.5rem;">
            <a href="#learn" class="btn-primary" onclick="window.appRouter.closeDetailModal()">EXPLORE COURSES FOR THIS SKILL →</a>
          </div>
        `);
      });
    });
  }

  setupLearnEvents() {
    const searchInput = document.getElementById('course-search-input');
    const platformSelect = document.getElementById('platform-filter-select');
    const priceSelect = document.getElementById('price-filter-select');
    const gridContainer = document.getElementById('courses-grid-container');
    const ytRefreshBtn = document.getElementById('yt-refresh-btn');
    const ytContainer = document.getElementById('yt-videos-container');

    const updateFilter = async () => {
      const q = searchInput.value;
      const platform = platformSelect.value;
      const price = priceSelect.value;

      const courseRes = await api.getCourses({ platform, isFree: price === 'FREE' ? true : 'ALL' });
      const courses = (courseRes && courseRes.courses) ? courseRes.courses : fallbackCourses;
      const filtered = filterCourses(courses, q, platform, price);
      gridContainer.innerHTML = renderCourseCardsList(filtered);
    };

    if (searchInput) searchInput.addEventListener('input', updateFilter);
    if (platformSelect) platformSelect.addEventListener('change', updateFilter);
    if (priceSelect) priceSelect.addEventListener('change', updateFilter);

    // Search YouTube Educational Videos
    if (ytRefreshBtn) {
      ytRefreshBtn.addEventListener('click', async () => {
        const query = searchInput?.value || 'Python';
        ytContainer.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">Fetching YouTube Data API videos for "${query}"...</div>`;
        const videoRes = await api.getEducationalVideos(query);
        const videos = videoRes?.videos || [];

        if (videos.length === 0) {
          ytContainer.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">No video results found.</div>`;
          return;
        }

        ytContainer.innerHTML = videos.map(v => `
          <div class="card" style="padding: 1rem;">
            <a href="${v.videoUrl}" target="_blank" rel="noopener">
              <img src="${v.thumbnailUrl}" alt="${v.title}" style="width: 100%; height: 140px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 0.75rem;">
              <h4 style="font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); line-height: 1.3;">${v.title}</h4>
              <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">${v.channelTitle}</span>
            </a>
          </div>
        `).join('');
      });
    }

    // Learner Info Popover Toggle
    document.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('.learner-toggle-btn');
      const closeBtn = e.target.closest('.close-popover-btn');
      
      if (toggleBtn) {
        e.stopPropagation();
        const targetId = toggleBtn.dataset.popoverTarget;
        const targetPopover = document.getElementById(targetId);
        
        document.querySelectorAll('.learner-popover').forEach(pop => {
          if (pop !== targetPopover) pop.classList.add('hidden');
        });

        if (targetPopover) {
          targetPopover.classList.toggle('hidden');
        }
      } else if (closeBtn) {
        e.stopPropagation();
        const popover = closeBtn.closest('.learner-popover');
        if (popover) popover.classList.add('hidden');
      } else if (!e.target.closest('.learner-popover')) {
        document.querySelectorAll('.learner-popover').forEach(pop => pop.classList.add('hidden'));
      }
    });

    // "Leads to" Trajectory Modal
    document.addEventListener('click', async (e) => {
      const btn = e.target.closest('.trajectory-btn');
      if (btn) {
        const skillName = btn.dataset.skill;
        const res = await api.getSkillPath(skillName);
        const trajectory = res?.trajectory || {
          skillName,
          whyItMatters: "Essential foundation for entry tech roles.",
          relatedInternships: [fallbackOpportunities.internships[0]],
          relatedJobs: [fallbackOpportunities.jobs[0]]
        };

        this.openDetailModal(`
          <h2 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.5rem;">🎯 WHERE THIS CAN LEAD: ${skillName}</h2>
          <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem;">Visually connecting Skill → Course → Internships → Entry Jobs.</p>

          <div class="card" style="margin-bottom: 1rem; background-color: var(--bg-color);">
            <strong style="font-size: 0.75rem; color: var(--green-primary); text-transform: uppercase;">VERIFIED MATCHED INTERNSHIP</strong>
            <h4 style="font-size: 1rem; font-weight: 800; margin-top: 0.25rem;">${trajectory.relatedInternships[0]?.title || 'Data Analyst Intern'}</h4>
            <span style="font-size: 0.8125rem; color: var(--text-muted);">${trajectory.relatedInternships[0]?.company} • ${trajectory.relatedInternships[0]?.stipend}</span>
          </div>

          <div class="card" style="background-color: var(--bg-color);">
            <strong style="font-size: 0.75rem; color: var(--amber-primary); text-transform: uppercase;">TARGET EARLY JOB ROLE</strong>
            <h4 style="font-size: 1rem; font-weight: 800; margin-top: 0.25rem;">${trajectory.relatedJobs[0]?.title || 'Junior Data Scientist'}</h4>
            <span style="font-size: 0.8125rem; color: var(--text-muted);">${trajectory.relatedJobs[0]?.company} • ${trajectory.relatedJobs[0]?.salary}</span>
          </div>
        `);
      }
    });
  }

  setupOpportunitiesEvents() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tab = btn.dataset.tab;
        document.getElementById('internships-tab-content').classList.toggle('hidden', tab !== 'internships');
        document.getElementById('jobs-tab-content').classList.toggle('hidden', tab !== 'jobs');
      });
    });

    const searchInput = document.getElementById('opp-search-input');
    const remoteCheckbox = document.getElementById('remote-only-checkbox');

    const updateOpportunities = async () => {
      const skill = searchInput?.value || '';
      const remoteOnly = remoteCheckbox?.checked || false;
      const res = await api.getOpportunities({ skill, remoteOnly });
      if (res) {
        if (res.internships) {
          const intContent = document.getElementById('internships-tab-content');
          if (intContent) {
            const grid = intContent.querySelector('.grid-2');
            if (grid) {
              grid.innerHTML = res.internships.length > 0 ? res.internships.map(item => `
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
                      ${item.requiredSkills.map(s => `<span class="badge" style="background: var(--bg-color); border: 1px solid var(--surface-border); color: var(--text-secondary);">${s}</span>`).join('')}
                    </div>
                  </div>

                  <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 1rem;">Eligibility: ${item.eligibility}</span>

                  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--surface-border); padding-top: 0.75rem;">
                    <span style="font-size: 0.75rem; color: var(--text-muted);">Source: ${item.source}</span>
                    <button class="btn-primary apply-modal-btn" data-title="${item.title}" data-company="${item.company}" data-url="${item.applyUrl}" style="background-color: var(--green-primary); font-size: 0.8125rem; padding: 0.4rem 0.875rem;">APPLY ON PORTAL ↗</button>
                  </div>
                </div>
              `).join('') : `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 2rem;">No internships matching criteria.</div>`;
            }
          }
        }
        if (res.jobs) {
          const jobsContent = document.getElementById('jobs-tab-content');
          if (jobsContent) {
            const grid = jobsContent.querySelector('.grid-2');
            if (grid) {
              grid.innerHTML = res.jobs.length > 0 ? res.jobs.map(item => `
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
                      ${item.requiredSkills.map(s => `<span class="badge" style="background: var(--bg-color); border: 1px solid var(--surface-border); color: var(--text-secondary);">${s}</span>`).join('')}
                    </div>
                  </div>

                  <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 1rem;">Eligibility: ${item.eligibility}</span>

                  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--surface-border); padding-top: 0.75rem;">
                    <span style="font-size: 0.75rem; color: var(--text-muted);">Source: ${item.source}</span>
                    <button class="btn-primary apply-modal-btn" data-title="${item.title}" data-company="${item.company}" data-url="${item.applyUrl}" style="background-color: var(--amber-primary); font-size: 0.8125rem; padding: 0.4rem 0.875rem;">APPLY ON PORTAL ↗</button>
                  </div>
                </div>
              `).join('') : `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 2rem;">No entry jobs matching criteria.</div>`;
            }
          }
        }
      }
    };

    if (searchInput) searchInput.addEventListener('input', updateOpportunities);
    if (remoteCheckbox) remoteCheckbox.addEventListener('change', updateOpportunities);

    // Apply Portal Modal
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.apply-modal-btn');
      if (btn) {
        const title = btn.dataset.title;
        const company = btn.dataset.company;
        const url = btn.dataset.url;

        this.openDetailModal(`
          <div style="text-align: center; padding: 1rem;">
            <span style="font-size: 2.5rem;">🔗</span>
            <h2 style="font-size: 1.35rem; font-weight: 800; margin-top: 0.5rem;">Redirecting to ${company} Verified Portal</h2>
            <p style="font-size: 0.9375rem; color: var(--text-secondary); margin: 0.75rem 0 1.5rem 0;">You are applying for: <strong>${title}</strong></p>
            <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1.5rem;">StudentHub provides direct attribution to official career web pages. We never use fake application forms.</p>
            <a href="${url}" target="_blank" rel="noopener" class="btn-primary" onclick="window.appRouter.closeDetailModal()">PROCEED TO OFFICIAL PORTAL ↗</a>
          </div>
        `);
      }
    });
  }

  setupPlannerEvents() {
    const select = document.getElementById('planner-role-select');
    if (select) {
      select.addEventListener('change', async (e) => {
        const profile = stateManager.getProfile();
        stateManager.saveProfile({ targetRole: e.target.value });
        this.renderRoute('planner');
      });
    }
  }

  setupTrendEvents() {
    document.querySelectorAll('.trend-topic-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        document.querySelectorAll('.trend-topic-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const topic = btn.dataset.topic;
        const profile = stateManager.getProfile();
        const res = await api.getTrendEvaluation(topic, profile.targetRole);
        const trendData = res?.trend || fallbackTrends.find(t => t.topic === topic) || fallbackTrends[0];
        
        document.getElementById('trend-evaluation-container').innerHTML = renderTrendMeters(trendData, profile.targetRole);
      });
    });
  }

  setupXDaysEvents() {
    const form = document.getElementById('xdays-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const days = Number(document.getElementById('xdays-period').value);
        const hoursPerWeek = Number(document.getElementById('xdays-hours').value);
        const goal = document.getElementById('xdays-goal').value;

        const res = await api.getLearningPlan(days, hoursPerWeek, goal);
        const plan = res?.plan || calculateLocalLearningPlan(days, hoursPerWeek, goal);
        document.getElementById('xdays-plan-output').innerHTML = renderTimetableSchedule(plan);
      });
    }
  }
}

// Bootstrap router on DOM Ready or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.appRouter = new AppRouter();
  });
} else {
  window.appRouter = new AppRouter();
}
