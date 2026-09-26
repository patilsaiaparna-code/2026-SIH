const aliasMap = {
  'ml': 'Machine Learning',
  'ai': 'Generative AI & LLMs',
  'dsa': 'Data Structures & Algorithms (DSA)',
  'algo': 'Data Structures & Algorithms (DSA)',
  'algorithms': 'Data Structures & Algorithms (DSA)',
  'js': 'JavaScript',
  'ts': 'TypeScript',
  'reactjs': 'React',
  'nodejs': 'Node.js',
  'py': 'Python',
  'postgres': 'SQL',
  'postgresql': 'SQL',
  'mysql': 'SQL',
  'viz': 'Data Visualization'
};

function normalizeSkillName(skillName) {
  if (!skillName) return '';
  const clean = skillName.trim().toLowerCase();
  return aliasMap[clean] || skillName.trim();
}

function calculateSkillGap(targetRoleRequiredSkills = [], studentSkills = []) {
  const studentSkillsNormalized = studentSkills.map(s => normalizeSkillName(s).toLowerCase());

  const matchedSkills = [];
  const missingSkills = [];

  targetRoleRequiredSkills.forEach(reqSkill => {
    const reqNormalized = normalizeSkillName(reqSkill).toLowerCase();
    const isMatched = studentSkillsNormalized.some(s => s === reqNormalized || reqNormalized.includes(s) || s.includes(reqNormalized));
    
    if (isMatched) {
      matchedSkills.push(reqSkill);
    } else {
      missingSkills.push(reqSkill);
    }
  });

  return {
    matchedSkills,
    skillsToBuild: missingSkills,
    matchPercentage: targetRoleRequiredSkills.length > 0 
      ? Math.round((matchedSkills.length / targetRoleRequiredSkills.length) * 100) 
      : 0
  };
}

module.exports = { calculateSkillGap, normalizeSkillName };
