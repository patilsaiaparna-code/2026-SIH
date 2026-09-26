const assert = require('assert');
const repository = require('../src/db/repository');
const { generateBranchRecommendation } = require('../src/services/branchRecommendationService');

async function runBranchTests() {
  console.log('🧪 Starting Branch-Wise Backend Extension Automated Test Suite...\n');
  let passed = 0;
  let total = 0;

  function test(name, fn) {
    total++;
    try {
      fn();
      console.log(`  ✅ PASSED: ${name}`);
      passed++;
    } catch (e) {
      console.error(`  ❌ FAILED: ${name}`);
      console.error(`     Error: ${e.message}`);
    }
  }

  // 1. Verify 12 Supported Branches
  test('Branch Requirement 1: All 12 Engineering Branches must be registered', () => {
    const branches = repository.getBranches();
    assert.strictEqual(branches.length, 12);
    const names = branches.map(b => b.branch_name);
    assert.ok(names.some(n => n.includes('Mechanical')));
    assert.ok(names.some(n => n.includes('Civil')));
    assert.ok(names.some(n => n.includes('Electronics & Communication')));
    assert.ok(names.some(n => n.includes('Electrical & Electronics')));
    assert.ok(names.some(n => n.includes('Aerospace')));
    assert.ok(names.some(n => n.includes('Biotechnology')));
  });

  // 2. Mechanical Branch Courses & Personalized Recommendation
  test('Branch Requirement 2: Mechanical + SolidWorks recommendation formula', () => {
    const rec = generateBranchRecommendation({
      branch: 'Mechanical Engineering',
      currentSkills: ['AutoCAD'],
      targetRole: 'CAD / Design Engineer',
      selectedCourseName: 'SolidWorks'
    });

    assert.strictEqual(rec.studentProfile.branch, 'Mechanical Engineering');
    assert.ok(rec.courseRecommendation.course_name.includes('SolidWorks'));
    assert.ok(rec.skillsTracker.requiredCareerSkills.length > 0);
    assert.ok(rec.careerRoadmap.ordered_steps.length > 0);
  });

  // 3. Civil Branch Courses & ETABS Structural Recommendation
  test('Branch Requirement 3: Civil + ETABS structural engineer recommendation formula', () => {
    const rec = generateBranchRecommendation({
      branch: 'Civil Engineering',
      currentSkills: ['STAAD.Pro'],
      targetRole: 'Structural Design Engineer',
      selectedCourseName: 'ETABS'
    });

    assert.strictEqual(rec.studentProfile.branch, 'Civil Engineering');
    assert.ok(rec.courseRecommendation.course_name.includes('ETABS'));
    assert.strictEqual(rec.courseRecommendation.difficulty, 'Advanced');
  });

  // 4. ECE Branch + Embedded C
  test('Branch Requirement 4: ECE + Embedded C firmware engineer recommendation formula', () => {
    const rec = generateBranchRecommendation({
      branch: 'Electronics & Communication Engineering (ECE)',
      currentSkills: ['Digital Electronics'],
      targetRole: 'Embedded Systems Engineer',
      selectedCourseName: 'Embedded C'
    });

    assert.strictEqual(rec.studentProfile.branch, 'Electronics & Communication Engineering (ECE)');
    assert.ok(rec.courseRecommendation.course_name.includes('Embedded C'));
  });

  // 5. EEE Branch + PLC & SCADA
  test('Branch Requirement 5: EEE + PLC & SCADA automation recommendation formula', () => {
    const rec = generateBranchRecommendation({
      branch: 'Electrical & Electronics Engineering (EEE)',
      currentSkills: ['Circuit Design'],
      targetRole: 'EV Powertrain Engineer',
      selectedCourseName: 'Battery Management Systems'
    });

    assert.strictEqual(rec.studentProfile.branch, 'Electrical & Electronics Engineering (EEE)');
    assert.ok(rec.courseRecommendation.course_name.includes('Battery Management'));
  });

  // 6. Aerospace & Biotechnology
  test('Branch Requirement 6: Aerospace and Biotech branch domain courses', () => {
    const aeroCourses = repository.getBranchCourses('Aerospace/Aeronautical Engineering');
    assert.ok(aeroCourses.some(c => c.course_name.includes('CATIA') || c.course_name.includes('CFD')));

    const biotechCourses = repository.getBranchCourses('Biotechnology');
    assert.ok(biotechCourses.some(c => c.course_name.includes('Bioinformatics') || c.course_name.includes('AI in Biotechnology')));
  });

  console.log(`\n====================================================`);
  console.log(`📊 Branch Test Summary: ${passed}/${total} Test Suites Passed (${Math.round((passed/total)*100)}%)`);
  console.log(`====================================================\n`);
}

runBranchTests();
