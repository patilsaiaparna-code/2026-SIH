const dataset = require('../data/branchDataset');

/**
 * Branch-Wise Personalized Recommendation Engine
 * Formula:
 * Student Branch + Current Skills + Career Goal + Selected Course + Required Career Skills = Personalized Recommendations
 */

function normalize(text = '') {
  return String(text).trim().toLowerCase();
}

function resolveBranch(branchName = '') {
  const norm = normalize(branchName);
  if (norm.includes('mech')) return dataset.branches.find(b => b.id === 'branch-mech');
  if (norm.includes('civil')) return dataset.branches.find(b => b.id === 'branch-civil');
  if (norm.includes('eee') || norm.includes('electrical & electronics') || norm.includes('electrical engineering')) return dataset.branches.find(b => b.id === 'branch-eee');
  if (norm.includes('ece') || norm.includes('electronics & communication') || norm.includes('electronics')) return dataset.branches.find(b => b.id === 'branch-ece');
  if (norm.includes('aero')) return dataset.branches.find(b => b.id === 'branch-aero');
  if (norm.includes('bio')) return dataset.branches.find(b => b.id === 'branch-biotech');
  if (norm.includes('ise') || norm.includes('information science')) return dataset.branches.find(b => b.id === 'branch-ise');
  if (norm.includes('ai') || norm.includes('machine learning')) return dataset.branches.find(b => b.id === 'branch-aiml');
  if (norm.includes('data science')) return dataset.branches.find(b => b.id === 'branch-ds');
  if (norm.includes('it') || norm.includes('information tech')) return dataset.branches.find(b => b.id === 'branch-it');
  if (norm.includes('cse') || norm.includes('computer science')) return dataset.branches.find(b => b.id === 'branch-cse');
  return dataset.branches.find(b => b.id === 'branch-cse') || dataset.branches[0];
}

function getCoursesForBranch(branchName = '', filters = {}) {
  const branch = resolveBranch(branchName);
  let list = dataset.courses.filter(c => c.branch_id === branch.id);

  // If no specific branch courses found, return all default courses for fallback
  if (list.length === 0) {
    list = dataset.courses;
  }

  if (filters.difficulty && filters.difficulty !== 'ALL') {
    list = list.filter(c => normalize(c.difficulty) === normalize(filters.difficulty));
  }

  if (filters.search) {
    const q = normalize(filters.search);
    list = list.filter(c => 
      normalize(c.title || c.course_name).includes(q) || 
      normalize(c.description).includes(q) ||
      c.skills?.some(s => normalize(s).includes(q))
    );
  }

  return list;
}

function getCareerRolesForBranch(branchName = '') {
  const branch = resolveBranch(branchName);
  const roles = dataset.career_roles.filter(r => r.branch_id === branch.id);
  if (roles.length > 0) return roles;
  return dataset.career_roles;
}

function getRoadmapForCareer(branchName = '', careerName = '') {
  const branch = resolveBranch(branchName);
  const normCareer = normalize(careerName);

  const matchedRoadmap = dataset.learning_roadmaps.find(r => 
    r.branch_id === branch.id && (normalize(r.career_name).includes(normCareer) || normCareer.includes(normalize(r.career_name)))
  );

  if (matchedRoadmap) return matchedRoadmap;

  // Fallback dynamic roadmap generated from branch courses
  const branchCourses = getCoursesForBranch(branchName);
  return {
    id: `roadmap-${branch.id}`,
    branch_id: branch.id,
    career_name: careerName || 'Domain Specialist',
    ordered_steps: branchCourses.slice(0, 5).map((c, idx) => ({
      step: idx + 1,
      name: c.course_name || c.title,
      focus: c.skills?.[0] || c.description.substring(0, 40)
    }))
  };
}

const { getCourseSpecificDetails } = require('../data/courseFoundationMap');

function generateBranchRecommendation({
  branch = 'CSE',
  currentSkills = [],
  targetRole = '',
  selectedCourseName = '',
  difficulty = 'ALL'
}) {
  const targetBranch = resolveBranch(branch);
  const branchCourses = getCoursesForBranch(branch, { difficulty });
  const branchCareers = getCareerRolesForBranch(branch);
  const normalizedSkills = currentSkills.map(s => normalize(s));

  // 1. Select or match target career role
  let targetCareer = branchCareers.find(r => normalize(r.title || r.role_name).includes(normalize(targetRole)));
  if (!targetCareer) targetCareer = branchCareers[0] || dataset.career_roles[0];

  // 2. Select course (matching selectedCourseName or primary recommended skill)
  let course = null;
  if (selectedCourseName) {
    course = branchCourses.find(c => normalize(c.course_name || c.title).includes(normalize(selectedCourseName)));
  }
  if (!course) {
    course = branchCourses.find(c => c.skills.some(s => !normalizedSkills.includes(normalize(s)))) || branchCourses[0];
  }

  // 3. Retrieve Course-Specific Prerequisites & Foundation Mapping
  const courseDetails = getCourseSpecificDetails(course?.course_name || course?.title || selectedCourseName, targetBranch.branch_name);

  // 4. Required Career Skills & Skills Tracker Calculation
  const requiredCareerSkills = course?.skills || ['Engineering Fundamentals'];
  const completedSkills = requiredCareerSkills.filter(s => normalizedSkills.includes(normalize(s)));
  const missingSkills = requiredCareerSkills.filter(s => !normalizedSkills.includes(normalize(s)));
  const matchPercentage = requiredCareerSkills.length > 0 
    ? Math.round((completedSkills.length / requiredCareerSkills.length) * 100)
    : 0;

  // 5. Matched Internships / Jobs for Course & Branch
  const matchedOpps = dataset.internships_jobs.filter(i => 
    i.branch_id === targetBranch.id || i.course_id === course?.id
  );
  const matchedInternship = matchedOpps[0] || dataset.internships_jobs[0];

  // 6. Dynamic Roadmap Position
  const roadmap = getRoadmapForCareer(branch, targetCareer.title || targetCareer.role_name);
  const roadmapStep = roadmap.ordered_steps.find(s => 
    normalize(s.name).includes(normalize(course?.course_name || course?.title || ''))
  ) || { step: 1, name: course?.course_name || course?.title, focus: 'Core Skill Mastery' };

  return {
    studentProfile: {
      branch: targetBranch.branch_name,
      targetRole: targetCareer.title || targetCareer.role_name,
      currentSkills
    },
    skillsTracker: {
      requiredCareerSkills,
      completedSkills,
      missingSkills,
      recommendedSkillsToBuild: missingSkills.length > 0 ? missingSkills : [requiredCareerSkills[0]],
      matchPercentage
    },
    courseRecommendation: {
      course_id: course.id,
      course_name: course.course_name || course.title,
      description: course.description,
      skills: course.skills,
      difficulty: course.difficulty,
      estimated_learning_time: course.estimated_learning_time,
      certification_available: course.certification_available,
      platform: course.platform,
      price: course.price,
      isFree: course.isFree,
      career_roles: [targetCareer.title || targetCareer.role_name],
      roadmap_position: `Step ${roadmapStep.step} of ${roadmap.ordered_steps.length} (${roadmapStep.focus})`,
      learning_resources: course.learning_resources || [
        { name: `${course.platform || 'Online'} Learning Resource`, url: 'https://coursera.org', isFree: course.isFree }
      ],
      courseSpecificPrerequisite: courseDetails.recommendedCourse
    },
    foundationPillars: courseDetails.foundation,
    matchedInternshipJob: {
      role: matchedInternship.role || matchedInternship.title,
      company: matchedInternship.company,
      stipendOrSalary: matchedInternship.stipend || matchedInternship.salary,
      applyUrl: matchedInternship.applyUrl,
      requirements: matchedInternship.requirements
    },
    careerRoadmap: roadmap
  };
}

module.exports = {
  resolveBranch,
  getCoursesForBranch,
  getCareerRolesForBranch,
  getRoadmapForCareer,
  generateBranchRecommendation
};
