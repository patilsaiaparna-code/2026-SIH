import { branches, academicYears, targetRoles, availableSkills } from '../data/metadata.js';
import { stateManager } from '../services/state.js';
import { api } from '../services/api.js';
import { fallbackCourses } from '../data/courses.js';
import { fallbackOpportunities } from '../data/opportunities.js';
import { fallbackTrends } from '../data/trends.js';
import { fallbackSkills } from '../data/skills.js';

export async function renderHomeView() {
  const profile = stateManager.getProfile();

  // Fetch 5 Recommendations from API or compute local
  let recs = null;
  const apiRes = await api.getRecommendations(profile);
  if (apiRes && apiRes.recommendations) {
    recs = apiRes.recommendations;
  } else {
    recs = {
      primarySkill: { title: fallbackSkills[0].name, badge: "HIGH DEMAND", description: fallbackSkills[0].whyItMatters },
      recommendedCourse: { title: fallbackCourses[0].title, platform: fallbackCourses[0].platform, priceTag: "FREE", url: fallbackCourses[0].url },
      matchedInternship: { title: fallbackOpportunities.internships[0].title, company: fallbackOpportunities.internships[0].company, stipend: "₹20,000 / mo", applyUrl: fallbackOpportunities.internships[0].applyUrl },
      targetJob: { title: fallbackOpportunities.jobs[0].title, company: fallbackOpportunities.jobs[0].company, salary: "₹10 - ₹14 LPA", applyUrl: fallbackOpportunities.jobs[0].applyUrl },
      industryTrend: { topic: fallbackTrends[0].topic, trendLevel: fallbackTrends[0].trendLevel, takeaway: fallbackTrends[0].takeaway }
    };
  }

  // Check 1st Year + Not Sure Yet condition
  const isBeginner = profile.year === "1st Year" && (profile.interest === "Not Sure Yet" || profile.targetRole === "Not Sure Yet");

  return `
    <!-- Hero Section -->
    <section class="hero-section">
      <span class="hero-label">CAREER CLARITY FOR ENGINEERING STUDENTS</span>
      <h1 class="hero-heading">Learn What Matters.<br>Find Where It Leads.</h1>
      <p class="hero-subtext">Clear, zero-clutter trajectory connecting engineering skills, curated courses, and verified job opportunities.</p>
    </section>

    <!-- Tell Us About Yourself Personalization Form -->
    <section class="personalization-card">
      <h2 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1.25rem;">⚡ Tell Us About Yourself</h2>
      <form id="personalization-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="branch-select">Branch</label>
            <select id="branch-select" class="form-control">
              ${branches.map(b => `<option value="${b}" ${profile.branch === b ? 'selected' : ''}>${b}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="year-select">Academic Year</label>
            <select id="year-select" class="form-control">
              ${academicYears.map(y => `<option value="${y}" ${profile.year === y ? 'selected' : ''}>${y}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="role-select">Target Role</label>
            <select id="role-select" class="form-control">
              ${targetRoles.map(r => `<option value="${r}" ${profile.targetRole === r ? 'selected' : ''}>${r}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="hours-input">Available Study Time</label>
            <select id="hours-input" class="form-control">
              <option value="5" ${profile.availableHoursPerWeek == 5 ? 'selected' : ''}>5 Hours / Week</option>
              <option value="10" ${profile.availableHoursPerWeek == 10 ? 'selected' : ''}>10 Hours / Week</option>
              <option value="15" ${profile.availableHoursPerWeek == 15 ? 'selected' : ''}>15+ Hours / Week</option>
            </select>
          </div>
        </div>

        <div class="form-group" style="margin-top: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <label style="margin-bottom: 0;">Your Current Skills</label>
            <input type="text" id="skill-filter-input" placeholder="🔍 Search skills..." style="width: 200px; font-size: 0.8125rem; padding: 0.3rem 0.65rem; border-radius: var(--radius-sm); border: 1px solid var(--surface-border); background: var(--bg-color); color: var(--text-primary);">
          </div>
          <div class="skills-pills-container" id="skills-pills-container">
            ${availableSkills.map(s => {
              const isSelected = profile.currentSkills.includes(s);
              return `<button type="button" class="skill-pill-toggle ${isSelected ? 'selected' : ''}" data-skill="${s}">${s} ${isSelected ? '✓' : '+'}</button>`;
            }).join('')}
          </div>
        </div>

        <div style="margin-top: 1.5rem; text-align: right;">
          <button type="submit" class="btn-primary">SHOW MY INFORMATION →</button>
        </div>
      </form>
    </section>

    <!-- Dynamic Course-Specific Foundation Banner -->
    ${(isBeginner || apiRes?.foundationPillars) ? `
      <section class="beginner-banner">
        <div class="beginner-header">
          <span class="beginner-tag">FOUNDATION MAPPING</span>
          <h3 class="beginner-title">Start with a Strong Foundation for ${profile.targetRole || profile.branch}</h3>
          <p style="color: var(--text-secondary); margin-top: 0.25rem;">Course-specific prerequisite and foundational pillars for your path:</p>
        </div>
        <div class="grid-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          ${(apiRes?.foundationPillars || [
            { name: 'Core Syntax & Logic', icon: '💻', desc: 'Programming fundamentals' },
            { name: 'Problem Solving', icon: '🧠', desc: 'Algorithms & logic' },
            { name: 'Version Control', icon: '🐙', desc: 'Git & repository basics' }
          ]).map((p, idx) => `
            <div class="card" style="padding: 1rem; text-align: center;">
              <div style="font-size: 1.5rem;">${p.icon || '📌'}</div>
              <strong style="display: block; margin-top: 0.5rem;">${idx + 1}. ${p.name}</strong>
              <span style="font-size: 0.8125rem; color: var(--text-muted);">${p.desc}</span>
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}

    <!-- Personalized Home Experience: 5 Curated Recommendations ("Good to Know") -->
    <section class="recommendations-section">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;">
        <h2 class="section-label">⚡ GOOD TO KNOW — CURATED FOR YOUR PROFILE (${profile.year} • ${profile.targetRole})</h2>
      </div>
      <div class="grid-5">
        <!-- 1. Primary Skill Focus -->
        <div class="rec-card">
          <div>
            <span class="rec-card-type type-skill">PRIMARY SKILL FOCUS</span>
            <h3 style="font-size: 1.125rem; font-weight: 800; margin-top: 0.5rem;">${recs.primarySkill.title}</h3>
            <span class="badge badge-high" style="margin-top: 0.35rem;">${recs.primarySkill.badge || 'HIGH DEMAND'}</span>
            <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.5rem;">${recs.primarySkill.description || 'Core requirement for your role.'}</p>
          </div>
          <a href="#news-skills" class="btn-secondary" style="padding: 0.4rem 0.75rem; font-size: 0.8125rem;">EXPLORE SKILL →</a>
        </div>

        <!-- 2. Recommended Course -->
        <div class="rec-card">
          <div>
            <span class="rec-card-type type-course">RECOMMENDED COURSE</span>
            <h3 style="font-size: 1rem; font-weight: 700; margin-top: 0.5rem;">${recs.recommendedCourse.title}</h3>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">${recs.recommendedCourse.platform} • ${recs.recommendedCourse.priceTag || 'FREE'}</span>
          </div>
          <a href="${recs.recommendedCourse.url || '#learn'}" target="_blank" class="btn-secondary" style="padding: 0.4rem 0.75rem; font-size: 0.8125rem;">VIEW COURSE →</a>
        </div>

        <!-- 3. Matched Internship -->
        <div class="rec-card">
          <div>
            <span class="rec-card-type type-internship">MATCHED INTERNSHIP</span>
            <h3 style="font-size: 1rem; font-weight: 700; margin-top: 0.5rem;">${recs.matchedInternship.title}</h3>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">${recs.matchedInternship.company}</span>
            <span style="font-size: 0.8125rem; font-weight: 600; color: var(--green-primary); display: block; margin-top: 0.25rem;">${recs.matchedInternship.stipend || 'Stipend Provided'}</span>
          </div>
          <a href="#opportunities" class="btn-secondary" style="padding: 0.4rem 0.75rem; font-size: 0.8125rem;">APPLY PORTAL →</a>
        </div>

        <!-- 4. Target Early Job -->
        <div class="rec-card">
          <div>
            <span class="rec-card-type type-job">TARGET EARLY JOB</span>
            <h3 style="font-size: 1rem; font-weight: 700; margin-top: 0.5rem;">${recs.targetJob.title}</h3>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">${recs.targetJob.company}</span>
            <span style="font-size: 0.8125rem; font-weight: 600; color: var(--amber-primary); display: block; margin-top: 0.25rem;">${recs.targetJob.salary || 'Market Standard'}</span>
          </div>
          <a href="#opportunities" class="btn-secondary" style="padding: 0.4rem 0.75rem; font-size: 0.8125rem;">VIEW JOB →</a>
        </div>

        <!-- 5. Key Industry Trend -->
        <div class="rec-card">
          <div>
            <span class="rec-card-type type-trend">KEY INDUSTRY TREND</span>
            <h3 style="font-size: 1rem; font-weight: 700; margin-top: 0.5rem;">${recs.industryTrend.topic}</h3>
            <span class="badge badge-growing" style="margin-top: 0.35rem;">${recs.industryTrend.trendLevel || 'HIGH HYPE'}</span>
            <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.5rem;">${recs.industryTrend.takeaway}</p>
          </div>
          <a href="#trend-checker" class="btn-secondary" style="padding: 0.4rem 0.75rem; font-size: 0.8125rem;">CHECK REALITY →</a>
        </div>
      </div>
    </section>

    <!-- Three Equal Main Feature Cards -->
    <section style="margin: 3rem 0;">
      <h2 class="section-label">EXPLORE CORE PLATFORM FEATURES</h2>
      <div class="grid-3">
        <!-- 1. NEWS & SKILLS -->
        <div class="card card-news">
          <span style="font-size: 1.5rem;">📰</span>
          <h3 style="font-size: 1.35rem; font-weight: 800; margin-top: 0.5rem;">NEWS & SKILLS</h3>
          <p style="color: var(--text-secondary); font-size: 0.9375rem; margin: 0.5rem 0 1.25rem 0;">Real-time placement bulletins, verified industry sources, and in-demand skill trajectories.</p>
          <a href="#news-skills" class="btn-primary" style="background-color: var(--blue-primary); width: 100%; justify-content: center;">EXPLORE NEWS & SKILLS →</a>
        </div>

        <!-- 2. LEARN -->
        <div class="card card-learn">
          <span style="font-size: 1.5rem;">📚</span>
          <h3 style="font-size: 1.35rem; font-weight: 800; margin-top: 0.5rem;">LEARN</h3>
          <p style="color: var(--text-secondary); font-size: 0.9375rem; margin: 0.5rem 0 1.25rem 0;">Curated catalog of free and paid courses from Kaggle, NPTEL, Coursera, & freeCodeCamp connected to real career paths.</p>
          <a href="#learn" class="btn-primary" style="background-color: var(--lavender-primary); width: 100%; justify-content: center;">FIND COURSES →</a>
        </div>

        <!-- 3. OPPORTUNITIES -->
        <div class="card card-opps">
          <span style="font-size: 1.5rem;">💼</span>
          <h3 style="font-size: 1.35rem; font-weight: 800; margin-top: 0.5rem;">OPPORTUNITIES</h3>
          <p style="color: var(--text-secondary); font-size: 0.9375rem; margin: 0.5rem 0 1.25rem 0;">Verified internships and graduate jobs with direct links to official company hiring portals.</p>
          <a href="#opportunities" class="btn-primary" style="background-color: var(--green-primary); width: 100%; justify-content: center;">FIND OPPORTUNITIES →</a>
        </div>
      </div>
    </section>

    <!-- Smart Decision Tools Preview -->
    <section style="margin: 3rem 0;">
      <h2 class="section-label">🎯 SMART DECISION TOOLS</h2>
      <div class="grid-3">
        <div class="card" style="border-left: 4px solid var(--blue-primary);">
          <span style="font-size: 1.25rem;">🎯</span>
          <h3 style="font-size: 1.125rem; font-weight: 800; margin-top: 0.35rem;">Opportunity Backward Planner</h3>
          <p style="font-size: 0.875rem; color: var(--text-secondary); margin: 0.5rem 0 1rem 0;">Start from your dream job role and reverse-engineer the exact skills, projects, and steps needed.</p>
          <a href="#planner" class="btn-secondary" style="font-size: 0.8125rem;">BUILD MY PATH →</a>
        </div>

        <div class="card" style="border-left: 4px solid var(--amber-primary);">
          <span style="font-size: 1.25rem;">🔥</span>
          <h3 style="font-size: 1.125rem; font-weight: 800; margin-top: 0.35rem;">Trend → Reality Checker</h3>
          <p style="font-size: 0.875rem; color: var(--text-secondary); margin: 0.5rem 0 1rem 0;">Compare social media tech hype against actual entry-level job posting requirements.</p>
          <a href="#trend-checker" class="btn-secondary" style="font-size: 0.8125rem;">CHECK A TREND →</a>
        </div>

        <div class="card" style="border-left: 4px solid var(--lavender-primary);">
          <span style="font-size: 1.25rem;">⏱</span>
          <h3 style="font-size: 1.125rem; font-weight: 800; margin-top: 0.35rem;">I Have X Days Plan</h3>
          <p style="font-size: 0.875rem; color: var(--text-secondary); margin: 0.5rem 0 1rem 0;">Input your available days and weekly hours to generate a realistic study schedule with focus guidance.</p>
          <a href="#x-days" class="btn-secondary" style="font-size: 0.8125rem;">CREATE MY PLAN →</a>
        </div>
      </div>
    </section>
  `;
}
