import { targetRoles } from '../data/metadata.js';
import { stateManager } from '../services/state.js';
import { api } from '../services/api.js';
import { calculateLocalLearningPlan } from '../services/plannerEngine.js';

export async function renderXDaysView() {
  const profile = stateManager.getProfile();
  let days = 30;
  let hoursPerWeek = profile.availableHoursPerWeek || 5;
  let goal = profile.targetRole || "Data Scientist";
  if (goal === "Not Sure Yet") goal = "Data Scientist";

  // Fetch plan from API or fallback
  let plan = null;
  const apiRes = await api.getLearningPlan(days, hoursPerWeek, goal);
  if (apiRes && apiRes.plan) {
    plan = apiRes.plan;
  } else {
    plan = calculateLocalLearningPlan(days, hoursPerWeek, goal);
  }

  return `
    <div class="view-header">
      <span class="hero-label">TIME-BASED STUDY PLANNER</span>
      <h1 class="view-title">HOW MUCH TIME DO YOU HAVE?</h1>
      <p class="view-subtitle">Generate a custom week-by-week study plan tailored strictly to your available study hours.</p>
    </div>

    <!-- Inputs Controls Card -->
    <div class="card" style="margin-bottom: 2rem; padding: 1.5rem;">
      <form id="xdays-form" class="form-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
        <div class="form-group">
          <label for="xdays-period">Available Period (Days)</label>
          <select id="xdays-period" class="form-control">
            <option value="15" ${days == 15 ? 'selected' : ''}>15 Days Sprint</option>
            <option value="30" ${days == 30 ? 'selected' : ''}>30 Days Plan</option>
            <option value="60" ${days == 60 ? 'selected' : ''}>60 Days Intensive</option>
            <option value="90" ${days == 90 ? 'selected' : ''}>90 Days Mastery</option>
          </select>
        </div>

        <div class="form-group">
          <label for="xdays-hours">Study Hours / Week</label>
          <select id="xdays-hours" class="form-control">
            <option value="5" ${hoursPerWeek == 5 ? 'selected' : ''}>5 Hours / Week</option>
            <option value="10" ${hoursPerWeek == 10 ? 'selected' : ''}>10 Hours / Week</option>
            <option value="15" ${hoursPerWeek == 15 ? 'selected' : ''}>15+ Hours / Week</option>
          </select>
        </div>

        <div class="form-group">
          <label for="xdays-goal">Target Career Goal</label>
          <select id="xdays-goal" class="form-control">
            ${targetRoles.filter(r => r !== "Not Sure Yet").map(r => `<option value="${r}" ${goal === r ? 'selected' : ''}>${r}</option>`).join('')}
          </select>
        </div>

        <div style="display: flex; align-items: flex-end;">
          <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">RECALCULATE PLAN →</button>
        </div>
      </form>
    </div>

    <!-- Generated Plan Output Container -->
    <div id="xdays-plan-output">
      ${renderTimetableSchedule(plan)}
    </div>
  `;
}

export function renderTimetableSchedule(plan) {
  return `
    <!-- Focus Statement Banner -->
    <div style="background: linear-gradient(135deg, var(--lavender-bg) 0%, #E9D5FF 100%); border: 1px solid var(--lavender-border); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
      <h3 style="font-size: 1.125rem; font-weight: 800; color: var(--lavender-primary);">💡 FOCUS STATEMENT</h3>
      <p style="font-size: 1.0625rem; font-weight: 700; color: var(--text-primary); margin-top: 0.35rem;">${plan.focusStatement}</p>
      <span style="font-size: 0.8125rem; color: var(--text-muted); display: block; margin-top: 0.5rem;">Target: ${plan.goal} • ${plan.totalDays} Days • ${plan.hoursPerWeek} Hours/Week (Total Estimated: ~${plan.totalEstimatedHours || plan.totalWeeks * plan.hoursPerWeek} Hours)</span>
    </div>

    <!-- Week-by-Week Timeline Schedule -->
    <section style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1.25rem;">📅 WEEK-BY-WEEK TIMETABLE SCHEDULE</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${plan.weeklySchedule.map(w => `
          <div class="card" style="border-left: 4px solid var(--lavender-primary);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <h4 style="font-size: 1.125rem; font-weight: 800; color: var(--text-primary);">${w.title}</h4>
              <span class="badge" style="background-color: var(--lavender-bg); color: var(--lavender-primary);">Week ${w.week}</span>
            </div>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${w.focus}</p>
            
            <div style="background-color: var(--bg-color); padding: 1rem; border-radius: var(--radius-md);">
              <strong style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Concrete Task Milestones:</strong>
              <ul style="margin-top: 0.35rem; padding-left: 1.25rem; font-size: 0.875rem; color: var(--text-primary);">
                ${w.tasks.map(t => `<li style="margin-bottom: 0.25rem;">${t}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Practical Advice: WHAT TO SKIP FOR NOW -->
    <section class="card" style="border-top: 4px solid #DC2626;">
      <h3 style="font-size: 1.125rem; font-weight: 800; color: #DC2626; margin-bottom: 0.75rem;">⚠️ WHAT TO SKIP FOR NOW (DO NOT WASTETIME)</h3>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
        ${plan.skillsToSkipForNow.map(item => `
          <li style="font-size: 0.9375rem; font-weight: 600; color: var(--text-secondary);">${item}</li>
        `).join('')}
      </ul>
    </section>
  `;
}
