const assert = require('assert');
const { calculateSkillGap, normalizeSkillName } = require('../src/logic/skillGap');
const { analyzeJobSkills } = require('../src/logic/jobSkillAnalysis');
const { generateLearningPlan } = require('../src/logic/learningPlan');
const { evaluateTrendReality } = require('../src/logic/trendChecker');
const { generateRecommendations } = require('../src/logic/recommendationEngine');
const plannerService = require('../src/services/plannerService');
const repository = require('../src/db/repository');

async function runTests() {
  console.log('🧪 Starting StudentHub Backend Logic Automated Test Suite...\n');
  let passedCount = 0;
  let totalCount = 0;

  function test(name, fn) {
    totalCount++;
    try {
      fn();
      console.log(`  ✅ PASSED: ${name}`);
      passedCount++;
    } catch (e) {
      console.error(`  ❌ FAILED: ${name}`);
      console.error(`     Error: ${e.message}`);
    }
  }

  async function asyncTest(name, fn) {
    totalCount++;
    try {
      await fn();
      console.log(`  ✅ PASSED: ${name}`);
      passedCount++;
    } catch (e) {
      console.error(`  ❌ FAILED: ${name}`);
      console.error(`     Error: ${e.message}`);
    }
  }

  // 1. Skill Gap Calculation & Alias Dict Test
  test('Requirement 1: Skill gap calculation with case-insensitivity & aliases', () => {
    assert.strictEqual(normalizeSkillName('ml'), 'Machine Learning');
    assert.strictEqual(normalizeSkillName('dsa'), 'Data Structures & Algorithms (DSA)');
    
    const required = ['Python', 'SQL', 'Machine Learning', 'Data Visualization'];
    const userSkills = ['py', 'postgres']; // Py -> Python, Postgres -> SQL
    
    const gap = calculateSkillGap(required, userSkills);
    assert.strictEqual(gap.matchedSkills.length, 2);
    assert.strictEqual(gap.skillsToBuild.length, 2);
    assert.strictEqual(gap.matchPercentage, 50);
  });

  // 2. Role Skill Prerequisites Lookup
  await asyncTest('Requirement 2: Role skill prerequisites lookup matrix', async () => {
    const role = await repository.getCareerRoleByName('Data Scientist');
    assert.ok(role, 'Data Scientist role should exist');
    assert.strictEqual(role.name, 'Data Scientist');
  });

  // 3. Course Matching & Platform Filters
  await asyncTest('Requirement 3: Course matching with platform and price filters', async () => {
    const courses = await repository.getCourses({ platform: 'Kaggle Learn', isFree: true });
    assert.ok(courses.length > 0, 'Kaggle free courses should be retrieved');
    assert.strictEqual(courses[0].platform, 'Kaggle Learn');
    assert.strictEqual(courses[0].isFree, true);
  });

  // 4. Hands-on Project Matching
  await asyncTest('Requirement 4: Hands-on project recommendation lookup', async () => {
    const projects = await repository.getProjects();
    assert.ok(projects.length > 0, 'Projects list should not be empty');
    assert.ok(projects[0].skillsUsed.length > 0, 'Project should list required skills');
  });

  // 5. 11-Step Backward Planner Engine
  await asyncTest('Requirement 5: 11-Step Opportunity Backward Planner generation', async () => {
    const plan = await plannerService.generateBackwardPlan('Data Scientist', ['Python', 'SQL']);
    assert.strictEqual(plan.targetRole, 'Data Scientist');
    assert.ok(plan.breadcrumbs.length >= 8, 'Should generate sequential breadcrumbs');
    assert.ok(plan.prioritizeFirst.length > 0, 'Should include prioritize first list');
    assert.ok(plan.deferForNow.length > 0, 'Should include defer for now list');
    assert.ok(plan.nextSteps.length >= 4, 'Should include concrete numbered next steps');
  });

  // 6. Time-based Learning Plan Engine
  test('Requirement 6: Time-based Learning Plan timetable generator', () => {
    const plan = generateLearningPlan(30, 5, 'Data Scientist');
    assert.strictEqual(plan.totalDays, 30);
    assert.strictEqual(plan.hoursPerWeek, 5);
    assert.ok(plan.weeklySchedule.length >= 4, '30 days should generate 4 weekly schedules');
    assert.ok(plan.skillsToSkipForNow.length > 0, 'Should return what to skip advice');
  });

  // 7. Multi-factor Trend Reality Checker
  test('Requirement 7: Multi-factor Trend Reality scoring', () => {
    const trend = evaluateTrendReality('Generative AI', 'Data Scientist');
    assert.strictEqual(trend.topic, 'Generative AI');
    assert.ok(trend.takeaway.length > 0);
    assert.strictEqual(trend.why.length, 3);
  });

  // 8. Job Skill Keyword Analysis
  test('Requirement 8: Job skill description scanner', () => {
    const sampleJobs = [
      { title: 'Junior Data Scientist', requiredSkills: ['Python', 'SQL', 'Machine Learning'] },
      { title: 'Data Analyst', requiredSkills: ['SQL', 'Data Visualization'] }
    ];
    const knownSkills = [{ name: 'Python' }, { name: 'SQL' }, { name: 'Machine Learning' }];
    
    const analysis = analyzeJobSkills(sampleJobs, knownSkills);
    assert.strictEqual(analysis.totalJobsAnalyzed, 2);
    assert.ok(analysis.inDemandSkills.length > 0);
    assert.strictEqual(analysis.inDemandSkills[0].name, 'SQL'); // SQL appears in both
  });

  // 9. Deterministic 5-Card Recommendation Engine
  await asyncTest('Requirement 9: Deterministic 5-card recommendation engine', async () => {
    const student = { branch: 'CSE', year: '2nd Year', targetRole: 'Data Scientist', currentSkills: ['Python'] };
    const result = await generateRecommendations(student);
    assert.ok(result.recommendations.primarySkill);
    assert.ok(result.recommendations.recommendedCourse);
    assert.ok(result.recommendations.matchedInternship);
    assert.ok(result.recommendations.targetJob);
    assert.ok(result.recommendations.industryTrend);
  });

  console.log(`\n====================================================`);
  console.log(`📊 Test Results: ${passedCount}/${totalCount} Test Suites Passed (${Math.round((passedCount/totalCount)*100)}%)`);
  console.log(`====================================================\n`);

  if (passedCount !== totalCount) {
    process.exit(1);
  }
}

if (require.main === module) {
  runTests();
}

module.exports = runTests;
