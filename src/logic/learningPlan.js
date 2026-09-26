function generateLearningPlan(totalDays = 30, hoursPerWeek = 5, goal = 'Data Scientist') {
  const totalWeeks = Math.max(1, Math.ceil(totalDays / 7));
  const weeklyHours = Math.max(2, hoursPerWeek);

  const weeklySchedule = [];

  for (let week = 1; week <= totalWeeks; week++) {
    if (week === 1) {
      weeklySchedule.push({
        week: 1,
        title: `Week 1: Core Fundamentals & Setup (${weeklyHours} Hours)`,
        focus: `Master Python syntax, basic SQL queries, and Git environment setup for ${goal}.`,
        tasks: [
          "Install Python 3 & VS Code / Jupyter Notebooks",
          "Complete Kaggle Python Intro (3 Hours)",
          "Practice 15 SQL SELECT, WHERE, and GROUP BY queries on LeetCode / HackerRank",
          "Initialize your GitHub profile and push a sample README project"
        ]
      });
    } else if (week === 2) {
      weeklySchedule.push({
        week: 2,
        title: `Week 2: Intermediate Concepts & Data Manipulation (${weeklyHours} Hours)`,
        focus: `Data processing with Pandas/NumPy or core DSA problem solving.`,
        tasks: [
          "Master Pandas DataFrames: filtering, grouping, and handling missing data",
          "Solve 10 SQL JOIN & Aggregate function problems",
          "Build a basic script automating data cleaning from a CSV dataset"
        ]
      });
    } else if (week === 3) {
      weeklySchedule.push({
        week: 3,
        title: `Week 3: Practical Hands-on Project (${weeklyHours} Hours)`,
        focus: `Combine Python + SQL into a portfolio project.`,
        tasks: [
          `Build a simple ${goal} baseline project (e.g. Exploratory Data Analysis or Web API)`,
          "Create a clean GitHub repository with documented README",
          "Write 3 key takeaways explaining insights discovered"
        ]
      });
    } else {
      weeklySchedule.push({
        week: week,
        title: `Week ${week}: Portfolio Polish & Opportunity Applications (${weeklyHours} Hours)`,
        focus: `Refine resume tags and submit targeted internship/job applications.`,
        tasks: [
          "Format resume highlighting 2 concrete project links & core skills",
          "Apply to 5 verified internship/job roles matching your skill stack",
          "Review interview questions for SQL and Python data structures"
        ]
      });
    }
  }

  const skillsToSkipForNow = [
    "❌ Advanced Deep Learning & Multi-GPU Training (Defer until fundamentals are solid)",
    "❌ Complex Microservice Infrastructure & Kubernetes (Focus on core APIs first)",
    "❌ Collecting 5+ Beginner Certificates (Focus on building 1 solid portfolio project instead)"
  ];

  return {
    goal,
    totalDays,
    hoursPerWeek: weeklyHours,
    totalEstimatedHours: totalWeeks * weeklyHours,
    totalWeeks,
    weeklySchedule,
    skillsToSkipForNow,
    focusStatement: `You don't need to learn everything. Focus strictly on the 2 core skills required for ${goal} within your ${totalDays}-day timeframe.`
  };
}

module.exports = { generateLearningPlan };
