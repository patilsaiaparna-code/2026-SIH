const repository = require('../db/repository');
const { calculateSkillGap } = require('../logic/skillGap');
const { fetchLiveJobs } = require('../integrations/adzuna');

const plannerService = {
  async generateBackwardPlan(targetRoleName = 'Data Scientist', userSkills = ['Python', 'SQL']) {
    const role = await repository.getCareerRoleByName(targetRoleName);
    const allSkills = await repository.getSkills();
    const allCourses = await repository.getCourses();
    const allProjects = await repository.getProjects();
    const allInternships = await repository.getInternships();

    // 1. Determine Required Skills for Role
    let requiredSkillsList = ['Python', 'SQL', 'Machine Learning', 'Data Visualization'];
    if (targetRoleName.toLowerCase().includes('software') || targetRoleName.toLowerCase().includes('sde')) {
      requiredSkillsList = ['Python', 'Data Structures & Algorithms (DSA)', 'Git & GitHub', 'SQL'];
    } else if (targetRoleName.toLowerCase().includes('cloud') || targetRoleName.toLowerCase().includes('devops')) {
      requiredSkillsList = ['AWS', 'Python', 'Git & GitHub', 'Docker & Kubernetes'];
    } else if (targetRoleName.toLowerCase().includes('analyst')) {
      requiredSkillsList = ['SQL', 'Data Visualization', 'Python'];
    }

    // 2. Skill Gap Analysis
    const gapResult = calculateSkillGap(requiredSkillsList, userSkills);

    // 3. Recommended Learning Resources
    const missingSkill = gapResult.skillsToBuild[0] || requiredSkillsList[0];
    const matchingCourses = allCourses.filter(c => 
      c.skillName?.toLowerCase() === missingSkill.toLowerCase() ||
      c.title.toLowerCase().includes(missingSkill.toLowerCase())
    );

    // 4. Concrete Portfolio Project
    const matchingProject = allProjects.find(p => 
      p.skillsUsed.some(s => requiredSkillsList.includes(s))
    ) || allProjects[0];

    // 5. Active Internships & Jobs
    const activeInternships = allInternships.filter(i => 
      i.requiredSkills.some(s => requiredSkillsList.includes(s))
    );
    const liveJobs = await fetchLiveJobs(targetRoleName);

    // 6. Breadcrumb Steps
    const breadcrumbs = [
      `1. TARGET ROLE: ${targetRoleName}`,
      `2. JOB REQUIREMENTS: ${requiredSkillsList.join(', ')}`,
      `3. YOUR SKILLS: ${gapResult.matchedSkills.join(', ') || 'None yet'}`,
      `4. SKILLS TO BUILD: ${gapResult.skillsToBuild.join(', ') || 'All prerequisites met!'}`,
      `5. LEARNING RESOURCES: ${matchingCourses[0]?.title || 'Python & SQL Fundamentals'}`,
      `6. PROJECT: ${matchingProject.title}`,
      `7. INTERNSHIP: ${activeInternships[0]?.title || 'Data Analyst Intern'}`,
      `8. JOB: ${liveJobs[0]?.title || targetRoleName}`
    ];

    // 7. Focus, Don't Overload Section
    const prioritizeFirst = gapResult.skillsToBuild.slice(0, 2);
    if (prioritizeFirst.length === 0) prioritizeFirst.push(requiredSkillsList[0]);

    const deferForNow = [
      "Advanced Deep Learning & Neural Architectures",
      "Multiple beginner certificates without code projects",
      "Complex DevOps pipelines before mastering basic APIs"
    ];

    const nextSteps = [
      `01. Master ${prioritizeFirst[0] || 'Core Skill'} using recommended course`,
      `02. Complete ${matchingProject.title} project and upload to GitHub`,
      `03. Apply to verified internship roles (${activeInternships[0]?.company || 'Tech Enterprise'})`,
      `04. Prepare resume with project link for target entry job (${targetRoleName})`
    ];

    return {
      targetRole: targetRoleName,
      requiredSkills: requiredSkillsList,
      matchedSkills: gapResult.matchedSkills,
      skillsToBuild: gapResult.skillsToBuild,
      matchPercentage: gapResult.matchPercentage,
      breadcrumbs,
      prioritizeFirst,
      deferForNow,
      nextSteps,
      recommendedCourse: matchingCourses[0] || allCourses[0],
      recommendedProject: matchingProject,
      matchedInternships: activeInternships.slice(0, 3),
      matchedJobs: liveJobs.slice(0, 3)
    };
  }
};

module.exports = plannerService;
