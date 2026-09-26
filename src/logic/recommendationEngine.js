const repository = require('../db/repository');
const { calculateSkillGap } = require('./skillGap');

async function generateRecommendations(studentProfile = {}) {
  const branch = studentProfile.branch || 'CSE';
  const year = studentProfile.year || '2nd Year';
  const currentSkills = studentProfile.currentSkills || ['Python'];

  const defaultRoleForBranch = branch.toLowerCase().includes('data science') ? 'Data Scientist' :
    (branch.toLowerCase().includes('ai') || branch.toLowerCase().includes('machine learning')) ? 'AI / ML Engineer' :
    branch.toLowerCase().includes('mech') ? 'Mechanical Design Engineer' :
    branch.toLowerCase().includes('civil') ? 'Structural Design Engineer' :
    (branch.toLowerCase().includes('ece') || branch.toLowerCase().includes('electronics')) ? 'Embedded Firmware Engineer' :
    (branch.toLowerCase().includes('eee') || branch.toLowerCase().includes('electrical')) ? 'Automation & Controls Engineer' :
    'Software Engineer';

  const targetRoleName = studentProfile.targetRole || defaultRoleForBranch;

  // 1. Determine Target Role & Skill Gap
  const role = await repository.getCareerRoleByName(targetRoleName);
  const allSkills = await repository.getSkills();
  const allCourses = await repository.getCourses();
  const allInternships = await repository.getInternships();
  const allJobs = await repository.getJobs();
  const allTrends = await repository.getTrends();

  // Primary Skill Focus (highest priority missing skill or primary skill)
  let targetSkillName = 'Python';
  if (targetRoleName.toLowerCase().includes('data analyst')) {
    targetSkillName = currentSkills.includes('SQL') ? 'Data Visualization' : 'SQL';
  } else if (targetRoleName.toLowerCase().includes('cloud') || targetRoleName.toLowerCase().includes('devops')) {
    targetSkillName = currentSkills.includes('AWS') ? 'Docker & Kubernetes' : 'AWS';
  } else if (targetRoleName.toLowerCase().includes('software') || targetRoleName.toLowerCase().includes('sde')) {
    targetSkillName = currentSkills.includes('Data Structures & Algorithms (DSA)') ? 'Git & GitHub' : 'Data Structures & Algorithms (DSA)';
  } else {
    targetSkillName = currentSkills.includes('Python') ? 'Machine Learning' : 'Python';
  }

  const primarySkill = allSkills.find(s => s.name.toLowerCase() === targetSkillName.toLowerCase()) || allSkills[0];

  // Retrieve branch specific recommendation data
  const branchRec = repository.getBranchRecommendation({
    branch,
    currentSkills,
    targetRole: targetRoleName,
    difficulty: studentProfile.difficulty || 'ALL'
  });

  const coursePrereq = branchRec.courseRecommendation.courseSpecificPrerequisite || {
    title: branchRec.courseRecommendation.course_name,
    platform: branchRec.courseRecommendation.platform || 'Coursera',
    priceTag: branchRec.courseRecommendation.price || 'FREE',
    url: branchRec.courseRecommendation.learning_resources?.[0]?.url || 'https://coursera.org'
  };

  const matchedCourse = {
    title: coursePrereq.title,
    platform: coursePrereq.platform || 'Coursera',
    priceTag: coursePrereq.priceTag || 'FREE',
    url: coursePrereq.url || 'https://coursera.org'
  };

  const matchedInternship = (branchRec && branchRec.matchedInternshipJob && branchRec.matchedInternshipJob.role) ? {
    title: branchRec.matchedInternshipJob.role,
    company: branchRec.matchedInternshipJob.company,
    location: 'India',
    stipend: branchRec.matchedInternshipJob.stipendOrSalary,
    applyUrl: branchRec.matchedInternshipJob.applyUrl || 'https://linkedin.com'
  } : (allInternships.find(i => {
    const reqs = i.requiredSkills || i.requirements || [];
    return reqs.some(s => currentSkills.includes(s) || s.toLowerCase() === targetSkillName.toLowerCase());
  }) || {
    title: branchRec.matchedInternshipJob.role,
    company: branchRec.matchedInternshipJob.company,
    location: 'India',
    stipend: branchRec.matchedInternshipJob.stipendOrSalary,
    applyUrl: branchRec.matchedInternshipJob.applyUrl || 'https://linkedin.com'
  });

  const matchedJob = allJobs.find(j => {
    const reqs = j.requiredSkills || j.requirements || [];
    return j.title.toLowerCase().includes(targetRoleName.toLowerCase()) || reqs.some(s => currentSkills.includes(s));
  }) || {
    title: branchRec.studentProfile.targetRole,
    company: branchRec.matchedInternshipJob.company,
    salary: branchRec.matchedInternshipJob.stipendOrSalary,
    location: 'India',
    applyUrl: 'https://verifiedportal.com'
  };

  // Key Industry Trend
  let matchedTrendTopic = 'Generative AI';
  if (targetRoleName.toLowerCase().includes('cloud') || targetRoleName.toLowerCase().includes('devops')) {
    matchedTrendTopic = 'Cloud Computing';
  } else if (targetRoleName.toLowerCase().includes('analyst')) {
    matchedTrendTopic = 'Data Analytics';
  } else if (branch.toLowerCase().includes('mech') || branch.toLowerCase().includes('civil') || branch.toLowerCase().includes('ece')) {
    matchedTrendTopic = 'IoT for Manufacturing';
  }
  const matchedTrend = allTrends.find(t => t.topic.toLowerCase() === matchedTrendTopic.toLowerCase()) || allTrends[0];

  return {
    studentSummary: {
      branch: branchRec.studentProfile.branch,
      year,
      targetRole: branchRec.studentProfile.targetRole,
      currentSkillsCount: currentSkills.length
    },
    recommendations: {
      primarySkill: {
        type: "PRIMARY_SKILL",
        title: branchRec.skillsTracker.recommendedSkillsToBuild[0] || primarySkill.name,
        badge: primarySkill.demandBadge || "HIGH DEMAND",
        description: primarySkill.whyItMatters || primarySkill.description,
        actionText: "EXPLORE SKILL →"
      },
      recommendedCourse: {
        type: "COURSE",
        title: matchedCourse.title,
        platform: matchedCourse.platform,
        priceTag: matchedCourse.priceTag,
        url: matchedCourse.url,
        actionText: "VIEW COURSE →"
      },
      matchedInternship: {
        type: "INTERNSHIP",
        title: matchedInternship.title,
        company: matchedInternship.company,
        location: matchedInternship.location || 'India',
        stipend: matchedInternship.stipend,
        applyUrl: matchedInternship.applyUrl,
        actionText: "APPLY PORTAL →"
      },
      targetJob: {
        type: "JOB",
        title: matchedJob.title,
        company: matchedJob.company,
        salary: matchedJob.salary,
        location: matchedJob.location || 'India',
        applyUrl: matchedJob.applyUrl,
        actionText: "VIEW JOB →"
      },
      industryTrend: {
        type: "TREND",
        topic: matchedTrend.topic,
        trendLevel: matchedTrend.trendLevel,
        takeaway: matchedTrend.takeaway,
        actionText: "CHECK REALITY →"
      }
    },
    foundationPillars: branchRec.foundationPillars,
    branchAnalysis: branchRec
  };
}

module.exports = { generateRecommendations };
