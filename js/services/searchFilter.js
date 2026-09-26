export function filterCourses(courses = [], query = '', platform = 'ALL', priceFilter = 'ALL') {
  let result = [...courses];

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.skillName?.toLowerCase().includes(q) ||
      c.platform.toLowerCase().includes(q)
    );
  }

  if (platform && platform !== 'ALL') {
    result = result.filter(c => c.platform.toLowerCase() === platform.toLowerCase());
  }

  if (priceFilter && priceFilter !== 'ALL') {
    if (priceFilter === 'FREE') {
      result = result.filter(c => c.isFree);
    } else if (priceFilter === 'FREE_CERTIFICATE') {
      result = result.filter(c => c.isFree && c.hasCertificate);
    } else if (priceFilter === 'PAID') {
      result = result.filter(c => !c.isFree);
    }
  }

  return result;
}

export function filterOpportunities(opportunities = { internships: [], jobs: [] }, query = '', remoteOnly = false) {
  let internships = [...opportunities.internships];
  let jobs = [...opportunities.jobs];

  if (query) {
    const q = query.toLowerCase();
    internships = internships.filter(i => 
      i.title.toLowerCase().includes(q) || 
      i.company.toLowerCase().includes(q) ||
      i.requiredSkills.some(s => s.toLowerCase().includes(q))
    );
    jobs = jobs.filter(j => 
      j.title.toLowerCase().includes(q) || 
      j.company.toLowerCase().includes(q) ||
      j.requiredSkills.some(s => s.toLowerCase().includes(q))
    );
  }

  if (remoteOnly) {
    internships = internships.filter(i => i.isRemote);
    jobs = jobs.filter(j => j.isRemote);
  }

  return { internships, jobs };
}
