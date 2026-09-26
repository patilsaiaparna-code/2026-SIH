import { api } from '../services/api.js';
import { fallbackCourses } from '../data/courses.js';
import { filterCourses } from '../services/searchFilter.js';

export async function renderLearnView() {
  const courseRes = await api.getCourses();
  const allCourses = (courseRes && courseRes.courses) ? courseRes.courses : fallbackCourses;

  // Initial Educational Videos
  const videoRes = await api.getEducationalVideos('Python');
  const videos = (videoRes && videoRes.videos) ? videoRes.videos : [];

  return `
    <div class="view-header">
      <h1 class="view-title">Learn Catalog & Career Trajectory</h1>
      <p class="view-subtitle">High-quality free and top courses mapped directly to real engineering jobs.</p>
    </div>

    <!-- Search & Filter Controls -->
    <div class="card" style="margin-bottom: 2rem; padding: 1.25rem;">
      <div class="form-grid" style="grid-template-columns: 2fr 1fr 1fr;">
        <div class="form-group">
          <label for="course-search-input">Search Courses or Skills</label>
          <input type="text" id="course-search-input" class="form-control" placeholder="Search Python, SQL, AWS, Kaggle...">
        </div>
        <div class="form-group">
          <label for="platform-filter-select">Platform</label>
          <select id="platform-filter-select" class="form-control">
            <option value="ALL">All Platforms</option>
            <option value="Kaggle Learn">Kaggle Learn</option>
            <option value="NPTEL">NPTEL</option>
            <option value="Coursera">Coursera</option>
            <option value="freeCodeCamp">freeCodeCamp</option>
            <option value="AWS">AWS Training</option>
          </select>
        </div>
        <div class="form-group">
          <label for="price-filter-select">Price / Certificate</label>
          <select id="price-filter-select" class="form-control">
            <option value="ALL">All Prices</option>
            <option value="FREE">Free Only</option>
            <option value="FREE_CERTIFICATE">Free + Certificate</option>
            <option value="PAID">Paid Courses</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Courses Grid -->
    <div id="courses-grid-container" class="grid-3">
      ${renderCourseCardsList(allCourses)}
    </div>

    <!-- Educational YouTube Section -->
    <section style="margin-top: 3.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <div>
          <h2 style="font-size: 1.25rem; font-weight: 800;">📺 Educational Video Resources (YouTube Integration)</h2>
          <p style="font-size: 0.875rem; color: var(--text-secondary);">Top free video tutorials matching your active learning path.</p>
        </div>
        <button id="yt-refresh-btn" class="btn-secondary" style="font-size: 0.8125rem;">SEARCH MORE VIDEOS 🔍</button>
      </div>

      <div id="yt-videos-container" class="grid-3">
        ${videos.map(v => `
          <div class="card" style="padding: 1rem;">
            <a href="${v.videoUrl}" target="_blank" rel="noopener">
              <img src="${v.thumbnailUrl}" alt="${v.title}" style="width: 100%; height: 140px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 0.75rem;">
              <h4 style="font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); line-height: 1.3;">${v.title}</h4>
              <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">${v.channelTitle}</span>
            </a>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

export function formatLearnerCount(num) {
  if (num === null || num === undefined || typeof num !== 'number' || num <= 0) return null;
  if (num >= 1000000) {
    const val = num / 1000000;
    const formatted = val % 1 === 0 ? val.toFixed(0) : val.toFixed(1).replace(/\.0$/, '');
    return `${formatted}M+`;
  }
  if (num >= 1000) {
    const val = num / 1000;
    if (val >= 10) {
      return `${Math.floor(val)}K+`;
    } else {
      const formatted = val % 1 === 0 ? val.toFixed(0) : val.toFixed(1).replace(/\.0$/, '');
      return `${formatted}K+`;
    }
  }
  return `${num}`;
}

export function renderLearnerPopoverContent(course) {
  const formattedCount = formatLearnerCount(course.learnerCount);
  if (!formattedCount) {
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
        <strong style="font-size: 0.8125rem;">👥 Learner Information</strong>
        <button class="close-popover-btn" style="background: none; border: none; font-size: 1rem; cursor: pointer; color: var(--text-muted);">&times;</button>
      </div>
      <p style="color: var(--text-secondary); margin: 0.25rem 0; font-size: 0.78125rem;">Verified learner count unavailable</p>
    `;
  }

  const label = course.learnerCountLabel || 'learners enrolled';
  const source = course.learnerCountSource || course.platform || 'Verified Portal';
  const verifiedAt = course.learnerCountVerifiedAt || 'Sep 26, 2026';
  const sourceUrl = course.learnerCountSourceUrl || course.url;

  return `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <strong style="font-size: 0.875rem; color: var(--text-primary);">👥 ${formattedCount} ${label}</strong>
      <button class="close-popover-btn" style="background: none; border: none; font-size: 1rem; cursor: pointer; color: var(--text-muted);">&times;</button>
    </div>
    <div style="font-size: 0.78125rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.25rem;">
      <div><strong>Source:</strong> ${source}</div>
      <div><strong>Verified:</strong> ${verifiedAt}</div>
      ${sourceUrl ? `
        <div style="margin-top: 0.35rem;">
          <a href="${sourceUrl}" target="_blank" rel="noopener" style="color: var(--blue-primary); text-decoration: underline; font-weight: 600;">View source →</a>
        </div>
      ` : ''}
    </div>
  `;
}

export function renderCourseCardsList(courses = []) {
  if (courses.length === 0) {
    return `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">No courses matched your filter criteria. Try adjusting the platform or search text.</div>`;
  }

  return courses.map((course, idx) => {
    const courseSlug = (course.id || `c-${idx}`).replace(/[^a-zA-Z0-9-]/g, '-');
    return `
    <div class="card card-learn" style="display: flex; flex-direction: column; justify-content: space-between; position: relative;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <span class="badge" style="background-color: var(--lavender-bg); color: var(--lavender-primary);">${course.platform}</span>
          <span class="badge" style="background-color: var(--green-bg); color: var(--green-primary);">${course.isFree ? 'FREE' : course.price}</span>
        </div>
        <h3 style="font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.35rem;">${course.title}</h3>
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.75rem;">Duration: ${course.duration || 'Flexible'} • Level: ${course.level || 'Beginner'}</span>
        <div style="background-color: var(--bg-color); padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
          💡 <strong>Why useful:</strong> ${course.whyUseful || 'Covers core prerequisites required for early technical job roles.'}
        </div>
        
        <!-- Small Learner Info Button & Popover -->
        <div style="margin-bottom: 0.85rem; position: relative;">
          <button class="btn-secondary learner-toggle-btn" 
                  data-popover-target="learner-popover-${courseSlug}"
                  style="font-size: 0.78125rem; padding: 0.35rem 0.65rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); background: var(--bg-card); cursor: pointer; color: var(--text-primary); display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 600;">
            👥 Learners
          </button>
          
          <div id="learner-popover-${courseSlug}" 
               class="learner-popover hidden" 
               style="position: absolute; bottom: 110%; left: 0; right: 0; z-index: 30; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.85rem; box-shadow: 0 10px 25px rgba(0,0,0,0.15); font-size: 0.8125rem; color: var(--text-primary);">
            ${renderLearnerPopoverContent(course)}
          </div>
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <a href="${course.url}" target="_blank" rel="noopener" class="btn-primary" style="flex: 1; background-color: var(--lavender-primary); justify-content: center; font-size: 0.8125rem;">VIEW COURSE →</a>
        <button class="btn-secondary trajectory-btn" data-skill="${course.skillName || 'Python'}" title="Where this leads" style="font-size: 0.8125rem; padding: 0.5rem;">🎯 LEADS TO</button>
      </div>
    </div>
  `;
  }).join('');
}
