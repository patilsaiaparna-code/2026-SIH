import { targetRoles } from '../data/metadata.js';
import { stateManager } from '../services/state.js';
import { api } from '../services/api.js';
import { calculateLocalBackwardPlan } from '../services/plannerEngine.js';

export async function renderBackwardPlannerView() {
  const profile = stateManager ? stateManager.getProfile() : {};
  let targetRole = profile.targetRole;
  if (!targetRole || targetRole === "Not Sure Yet") {
    const b = (profile.branch || '').toLowerCase();
    targetRole = b.includes('ece') ? "Embedded Firmware Engineer" :
      b.includes('mech') ? "Mechanical Design Engineer" :
      b.includes('civil') ? "Structural Design Engineer" :
      b.includes('eee') ? "Automation & Controls Engineer" :
      b.includes('data') ? "Data Scientist" :
      (b.includes('ai') || b.includes('machine learning')) ? "AI / ML Engineer" :
      "Software Engineer";
  }

  // Fetch from API or local fallback
  let plan = null;
  const apiRes = await api.getBackwardPlan(targetRole, profile.currentSkills);
  if (apiRes && apiRes.plan) {
    plan = apiRes.plan;
  } else {
    plan = calculateLocalBackwardPlan(targetRole, profile.currentSkills);
  }

  return `
    <div class="view-header">
      <span class="hero-label">CAREER BLUEPRINT ENGINE</span>
      <h1 class="view-title">START FROM THE OPPORTUNITY</h1>
      <p class="view-subtitle">Select your target engineering role to reverse-engineer job requirements into a step-by-step career path.</p>
    </div>

    <!-- Target Role Selector -->
    <div class="card" style="margin-bottom: 2rem; padding: 1.25rem;">
      <div class="form-group">
        <label for="planner-role-select" style="font-size: 0.875rem; font-weight: 800;">SELECT YOUR TARGET OPPORTUNITY ROLE</label>
        <select id="planner-role-select" class="form-control" style="font-size: 1.0625rem; font-weight: 700; color: var(--blue-primary); border-color: var(--blue-border); margin-top: 0.5rem;">
          ${targetRoles.filter(r => r !== "Not Sure Yet").map(r => `<option value="${r}" ${targetRole === r ? 'selected' : ''}>🎯 ${r}</option>`).join('')}
        </select>
      </div>
    </div>

    <!-- Sequential Breadcrumbs Timeline -->
    <section class="card" style="margin-bottom: 2rem; background: linear-gradient(180deg, var(--blue-bg) 0%, var(--surface-color) 30%);">
      <h3 style="font-size: 0.875rem; font-weight: 800; text-transform: uppercase; color: var(--blue-primary); letter-spacing: 0.06em;">8-STEP CAREER TRAJECTORY PATH</h3>
      <div class="step-breadcrumbs">
        ${plan.breadcrumbs.map((crumb, idx) => `<div class="crumb ${idx <= 3 ? 'active' : ''}">${crumb}</div>`).join(' ↓ ')}
      </div>
    </section>

    <!-- Requirement vs Skill Comparison Grid -->
    <section class="card" style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.125rem; font-weight: 800; margin-bottom: 1rem;">📊 REQUIREMENTS VS YOUR SKILL MATRIX</h3>
      <div class="comparison-grid">
        <div>
          <strong style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Job Prerequisites</strong>
          <ul style="margin-top: 0.5rem; list-style: none;">
            ${plan.requiredSkills.map(s => `<li style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.35rem;">• ${s}</li>`).join('')}
          </ul>
        </div>
        <div>
          <strong style="color: var(--green-primary); font-size: 0.75rem; text-transform: uppercase;">Your Matching Skills (✓)</strong>
          <ul style="margin-top: 0.5rem; list-style: none;">
            ${plan.matchedSkills.length > 0 ? plan.matchedSkills.map(s => `<li style="font-size: 0.875rem; font-weight: 600; color: var(--green-primary); margin-bottom: 0.35rem;">✓ ${s}</li>`).join('') : '<li style="font-size: 0.8125rem; color: var(--text-muted);">None matching yet</li>'}
          </ul>
        </div>
        <div>
          <strong style="color: var(--blue-primary); font-size: 0.75rem; text-transform: uppercase;">Skills to Build</strong>
          <ul style="margin-top: 0.5rem; list-style: none;">
            ${plan.skillsToBuild.length > 0 ? plan.skillsToBuild.map(s => `<li style="font-size: 0.875rem; font-weight: 600; color: var(--blue-primary); margin-bottom: 0.35rem;">⚡ ${s}</li>`).join('') : '<li style="font-size: 0.8125rem; color: var(--green-primary);">✓ All skills ready!</li>'}
          </ul>
        </div>
      </div>
    </section>

    <!-- Focus, Don't Overload Section -->
    <section class="grid-2" style="margin-bottom: 2rem;">
      <div class="card" style="border-top: 4px solid var(--green-primary);">
        <h3 style="font-size: 1.125rem; font-weight: 800; color: var(--green-primary); margin-bottom: 0.75rem;">✓ PRIORITIZE FIRST</h3>
        <ul style="list-style: none;">
          ${plan.prioritizeFirst.map(item => `<li style="font-size: 0.9375rem; font-weight: 600; margin-bottom: 0.5rem;">🔥 ${item}</li>`).join('')}
        </ul>
      </div>

      <div class="card" style="border-top: 4px solid #DC2626;">
        <h3 style="font-size: 1.125rem; font-weight: 800; color: #DC2626; margin-bottom: 0.75rem;">❌ NOT YET (DEFER FOR NOW)</h3>
        <ul style="list-style: none;">
          ${plan.deferForNow.map(item => `<li style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${item}</li>`).join('')}
        </ul>
      </div>
    </section>

    <!-- Concrete Numbered Next Steps -->
    <section class="card" style="margin-bottom: 2rem; background-color: var(--surface-color);">
      <h3 style="font-size: 1.125rem; font-weight: 800; margin-bottom: 1rem;">🚀 CONCRETE RECOMMENDED ACTION STEPS</h3>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        ${plan.nextSteps.map(step => `
          <div style="padding: 0.875rem 1.25rem; background-color: var(--bg-color); border-radius: var(--radius-md); font-weight: 700; font-size: 0.9375rem; color: var(--text-primary);">
            ${step}
          </div>
        `).join('')}
      </div>
    </section>
  `;
}
